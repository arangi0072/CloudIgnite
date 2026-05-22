package repository

import (
	"context"
	"database/sql"
	"time"

	"auth-service/internal/db"
	"auth-service/internal/models"

	"github.com/google/uuid"
)

//////////////////////////////////////////////////////
// CREATE SESSION
//////////////////////////////////////////////////////

type RefreshToken struct {
	ID               string
	SessionID        string
	RefreshTokenHash string

	UsedAt sql.NullTime

	ExpiresAt time.Time
	Revoked   bool
}

type Session struct {
	ID        string
	ProjectID string
	UserID    string
	DeviceID  string

	Email string

	IP        string
	UserAgent string

	Revoked bool
}

// ============================================
// CREATE SESSION
// ============================================

func CreateSession(
	projectID,
	userID,
	deviceID,
	email,
	ip,
	ua string,
) (string, error) {

	var sessionID string

	err := db.AuthPool.QueryRow(
		context.Background(),
		`
		INSERT INTO auth_sessions (
			project_id,
			user_id,
			device_id,
			ip_address,
			user_agent,
			email,
			expires_at
		)
		VALUES ($1,$2,$3,$4,$5,$6,$7)
		RETURNING id
		`,
		projectID,
		userID,
		deviceID,
		ip,
		ua,
		email,
		time.Now().Add(30*24*time.Hour),
	).Scan(&sessionID)

	if err != nil {
		return "", err
	}

	return sessionID, nil
}

//////////////////////////////////////////////////////
// FIND SESSION
//////////////////////////////////////////////////////

func GetSession(hash string) (string, string, string, error) {

	var userID, projectID, email string

	err := db.AuthPool.QueryRow(context.Background(), `
	SELECT user_id, project_id, email
	FROM auth_sessions
	WHERE refresh_token_hash=$1
	AND revoked=false
	AND expires_at > now()
	`, hash).Scan(&userID, &projectID, &email)

	return userID, projectID, email, err
}

func DeleteSession(hash string) error {

	_, err := db.AuthPool.Exec(context.Background(), `
	DELETE FROM auth_sessions
	WHERE refresh_token_hash=$1
	`, hash)

	return err
}

func ListUserSessions(userID, projectID uuid.UUID) ([]models.Session, error) {

	query := `
        SELECT id, user_id, project_id, user_agent, ip_address,
               created_at, expires_at, last_used_at, is_revoked
        FROM sessions
        WHERE user_id=$1
        AND project_id=$2
        AND is_revoked=false
        ORDER BY created_at DESC
    `

	rows, err := db.AuthPool.Query(context.Background(), query, userID, projectID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var sessions []models.Session

	for rows.Next() {
		var s models.Session
		err := rows.Scan(
			&s.ID,
			&s.UserID,
			&s.ProjectID,
			&s.UserAgent,
			&s.IPAddress,
			&s.CreatedAt,
			&s.ExpiresAt,
			&s.LastUsedAt,
			&s.IsRevoked,
		)
		if err != nil {
			return nil, err
		}

		sessions = append(sessions, s)
	}

	return sessions, nil
}

func RevokeOtherSessions(userID, projectID, currentSessionID uuid.UUID) error {

	query := `
        UPDATE sessions
        SET is_revoked=true, revoked_at=NOW()
        WHERE user_id=$1
        AND project_id=$2
        AND id != $3
    `

	_, err := db.AuthPool.Exec(context.Background(), query, userID, projectID, currentSessionID)

	return err
}

// ============================================
// GET REFRESH TOKEN
// ============================================

func GetRefreshToken(
	hash string,
) (*RefreshToken, error) {

	var token RefreshToken

	err := db.AuthPool.QueryRow(
		context.Background(),
		`
		SELECT
			id,
			session_id,
			refresh_token_hash,
			used_at,
			expires_at,
			revoked
		FROM auth_refresh_tokens
		WHERE refresh_token_hash = $1
		LIMIT 1
		`,
		hash,
	).Scan(
		&token.ID,
		&token.SessionID,
		&token.RefreshTokenHash,
		&token.UsedAt,
		&token.ExpiresAt,
		&token.Revoked,
	)

	if err != nil {
		return nil, err
	}

	return &token, nil
}

// ============================================
// MARK REFRESH TOKEN USED
// ============================================

func MarkRefreshTokenUsed(
	tokenID string,
) error {

	_, err := db.AuthPool.Exec(
		context.Background(),
		`
		UPDATE auth_refresh_tokens
		SET used_at = NOW()
		WHERE id = $1
		`,
		tokenID,
	)

	return err
}

// ============================================
// GET SESSION BY ID
// ============================================

func GetSessionByID(
	sessionID string,
) (*Session, error) {

	var session Session

	err := db.AuthPool.QueryRow(
		context.Background(),
		`
		SELECT
			id,
			project_id,
			user_id,
			device_id,
			email,
			ip_address,
			user_agent,
			revoked
		FROM auth_sessions
		WHERE id = $1
		LIMIT 1
		`,
		sessionID,
	).Scan(
		&session.ID,
		&session.ProjectID,
		&session.UserID,
		&session.DeviceID,
		&session.Email,
		&session.IP,
		&session.UserAgent,
		&session.Revoked,
	)

	if err != nil {
		return nil, err
	}

	return &session, nil
}

// ============================================
// UPDATE SESSION LAST SEEN
// ============================================

func UpdateSessionLastSeen(
	sessionID string,
	ip string,
) error {

	_, err := db.AuthPool.Exec(
		context.Background(),
		`
		UPDATE auth_sessions
		SET
			last_seen = NOW(),
			ip_address = $2
		WHERE id = $1
		`,
		sessionID,
		ip,
	)

	return err
}

func RevokeSession(
	sessionID string,
) error {

	//////////////////////////////////////////////////
	// REVOKE SESSION
	//////////////////////////////////////////////////

	_, err := db.AuthPool.Exec(
		context.Background(),
		`
		UPDATE auth_sessions
		SET
			revoked = TRUE,
			revoked_at = NOW()
		WHERE id = $1
		`,
		sessionID,
	)

	if err != nil {
		return err
	}

	//////////////////////////////////////////////////
	// REVOKE REFRESH TOKENS
	//////////////////////////////////////////////////

	_, err = db.AuthPool.Exec(
		context.Background(),
		`
		UPDATE auth_refresh_tokens
		SET revoked = TRUE
		WHERE session_id = $1
		`,
		sessionID,
	)

	return err
}

func RevokeAll(
	projectID,
	userID string,
) error {

	//////////////////////////////////////////////////
	// REVOKE ALL SESSIONS
	//////////////////////////////////////////////////

	_, err := db.AuthPool.Exec(
		context.Background(),
		`
		UPDATE auth_sessions
		SET
			revoked = TRUE,
			revoked_at = NOW()
		WHERE project_id = $1
		AND user_id = $2
		`,
		projectID,
		userID,
	)

	if err != nil {
		return err
	}

	//////////////////////////////////////////////////
	// REVOKE ALL REFRESH TOKENS
	//////////////////////////////////////////////////

	_, err = db.AuthPool.Exec(
		context.Background(),
		`
		UPDATE auth_refresh_tokens
		SET revoked = TRUE
		WHERE session_id IN (
			SELECT id
			FROM auth_sessions
			WHERE project_id = $1
			AND user_id = $2
		)
		`,
		projectID,
		userID,
	)

	return err
}
