package repository

import (
	"context"
	"time"

	"cloudignite-auth/internal/db"
)

//////////////////////////////////////////////////////
// LIST KEYS
//////////////////////////////////////////////////////

func ListKeys(serviceID string) ([]map[string]any, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	rows, err := db.Pool.Query(ctx, `
	SELECT id, key_preview, type, created_at, revoked_at
	FROM service_api_keys
	WHERE service_id=$1
	ORDER BY created_at DESC`, serviceID)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var keys []map[string]any

	for rows.Next() {

		var (
			id      string
			preview string
			typ     string
			created time.Time
			revoked *time.Time
		)

		if err := rows.Scan(&id, &preview, &typ, &created, &revoked); err != nil {
			return nil, err
		}

		keys = append(keys, map[string]any{
			"id":         id,
			"preview":    preview,
			"type":       typ,
			"created_at": created,
			"revoked":    revoked != nil,
		})
	}

	return keys, nil
}

//////////////////////////////////////////////////////
// GET PUBLISHABLE PREVIEW
//////////////////////////////////////////////////////

func GetPublishableKey(serviceID string) (string, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var preview string

	err := db.Pool.QueryRow(ctx, `
	SELECT key_preview
	FROM service_api_keys
	WHERE service_id=$1
	AND type='publishable'
	AND revoked_at IS NULL`,
		serviceID).Scan(&preview)

	return preview, err
}

//////////////////////////////////////////////////////
// ROTATE SECRET
//////////////////////////////////////////////////////

func RotateSecretTx(serviceID, hash, preview string) error {

	ctx := context.Background()

	tx, err := db.Pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	// revoke old
	_, err = tx.Exec(ctx, `
	UPDATE service_api_keys
	SET revoked_at=now()
	WHERE service_id=$1
	AND type='secret'
	AND revoked_at IS NULL`, serviceID)

	if err != nil {
		return err
	}

	// insert new
	_, err = tx.Exec(ctx, `
	INSERT INTO service_api_keys
	(service_id, key_prefix, key_hash, key_preview, type)
	VALUES ($1,'sk_ci',$2,$3,'secret')`,
		serviceID, hash, preview)

	if err != nil {
		return err
	}

	return tx.Commit(ctx)
}

//////////////////////////////////////////////////////
// REVOKE KEY
//////////////////////////////////////////////////////

func RevokeKey(keyID string) error {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := db.Pool.Exec(ctx,
		`UPDATE service_api_keys
		 SET revoked_at=now()
		 WHERE id=$1`,
		keyID)

	return err
}

//////////////////////////////////////////////////////
// INITIAL SECRET
//////////////////////////////////////////////////////

func GetInitialSecret(serviceID string) (string, error) {

	ctx := context.Background()

	tx, err := db.Pool.Begin(ctx)
	if err != nil {
		return "", err
	}
	defer tx.Rollback(ctx)

	var encrypted string

	err = tx.QueryRow(ctx, `
	SELECT encrypted_payload
	FROM service_provision_results
	WHERE service_id=$1
	AND expires_at > now()`,
		serviceID).Scan(&encrypted)

	if err != nil {
		return "", err
	}

	_, err = tx.Exec(ctx,
		`DELETE FROM service_provision_results
		 WHERE service_id=$1`, serviceID)

	if err != nil {
		return "", err
	}

	tx.Commit(ctx)

	return encrypted, nil
}
