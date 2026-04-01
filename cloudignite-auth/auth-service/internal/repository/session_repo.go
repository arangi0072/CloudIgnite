package repository

import (
	"context"
	"time"

	"auth-service/internal/db"
	"auth-service/internal/models"

	"github.com/google/uuid"
)

//////////////////////////////////////////////////////
// CREATE SESSION
//////////////////////////////////////////////////////

func CreateSession(
	projectID,
	userID,
	hash,
	email,
	ip,
	ua string,
) error {

	_, err := db.AuthPool.Exec(context.Background(), `
	INSERT INTO auth_sessions
	(project_id,user_id,refresh_token_hash,
	 ip_address,user_agent,email,expires_at)
	VALUES ($1,$2,$3,$4,$5,$6,$7)
	`,
		projectID,
		userID,
		hash,
		ip,
		ua,
		email,
		time.Now().Add(30*24*time.Hour),
	)

	return err
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

//////////////////////////////////////////////////////
// REVOKE ONE
//////////////////////////////////////////////////////

func RevokeSession(sessionID string, userID string) error {

	query := `
        UPDATE sessions
        SET is_revoked=true, revoked_at=NOW()
        WHERE id=$1 AND user_id=$2
    `

	_, err := db.AuthPool.Exec(context.Background(), query, sessionID, userID)
	return err
}

//////////////////////////////////////////////////////
// REVOKE ALL
//////////////////////////////////////////////////////

func RevokeAll(projectID, userID string) {

	db.AuthPool.Exec(context.Background(),
		`UPDATE auth_sessions
		 SET revoked=true
		 WHERE project_id=$1
		 AND user_id=$2`,
		projectID,
		userID)
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
