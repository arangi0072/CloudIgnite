package utils

import (
	"context"
	"crypto/rsa"
	"crypto/x509"
	"encoding/json"
	"encoding/pem"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	"storage-service/internal/db"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type AccessClaims struct {
	UserID    string `json:"uid"`
	ProjectID string `json:"pid"`
	Email     string `json:"email"`

	SessionID string `json:"sid"`
	DeviceID  string `json:"did"`

	jwt.RegisteredClaims
}

type JWK struct {
	Kid string `json:"kid"`
	Kty string `json:"kty"`
	N   string `json:"n"`
	E   string `json:"e"`
	Alg string `json:"alg"`
	Use string `json:"use"`
}

type JWKS struct {
	Keys []struct {
		Kid       string `json:"kid"`
		PublicKey string `json:"public_key"`
	} `json:"keys"`
}

func GetProjectByPKHash(hash string) (string, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var ID string

	err := db.StoragePool.QueryRow(ctx,
		`SELECT project_id
		FROM storage_projects
		WHERE publishable_key_hash=$1`,
		hash,
	).Scan(&ID)

	if err != nil {

		if errors.Is(err, pgx.ErrNoRows) {
			return "", errors.New("project not found")
		}

		return "", err
	}

	return ID, nil

}

func GetProjectBySecretHash(hash string) (string, error) {

	var ID string

	err := db.StoragePool.QueryRow(
		context.Background(),
		`SELECT project_id
		 FROM storage_projects
		 WHERE secret_key_hash=$1`,
		hash,
	).Scan(&ID)

	if err != nil {
		return "", err
	}

	return ID, nil
}

func ResolveObjectKey(inputKey string, filename string) string {

	if inputKey == "" {
		return filename
	}

	// if key ends with "/" → treat as folder
	if strings.HasSuffix(inputKey, "/") {
		return inputKey + filename
	}

	// if key has no extension → treat as folder
	if !strings.Contains(strings.Split(inputKey, "/")[len(strings.Split(inputKey, "/"))-1], ".") {
		return inputKey + "/" + filename
	}

	// full key already
	return inputKey
}

func GenerateUploadToken(objectID uuid.UUID, projectID string) (string, error) {
	claims := jwt.MapClaims{
		"object_id":  objectID.String(),
		"project_id": projectID,
		"exp":        time.Now().Add(10 * time.Minute).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("UPLOAD_SECRET")))
}

func VerifyUploadToken(tokenStr string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("UPLOAD_SECRET")), nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	return token.Claims.(jwt.MapClaims), nil
}

func fetchJWKS(projectID string) (*JWKS, error) {
	url := fmt.Sprintf("http://localhost:8081/.well-known/jwks/%s", projectID)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var jwks JWKS
	if err := json.Unmarshal(body, &jwks); err != nil {
		return nil, fmt.Errorf("parse error: %w\nRaw: %s", err, string(body))
	}

	return &jwks, nil
}

func GetPublicKeyByKID(projectID string, kid string) (*rsa.PublicKey, error) {

	jwks, err := fetchJWKS(projectID)
	if err != nil {
		return nil, err
	}

	for _, k := range jwks.Keys {
		if k.Kid == kid {

			block, _ := pem.Decode([]byte(k.PublicKey))
			if block == nil {
				return nil, errors.New("invalid PEM")
			}

			return x509.ParsePKCS1PublicKey(block.Bytes)
		}
	}

	return nil, errors.New("kid not found")
}

func VerifyAccessToken(
	tokenString string,
	publicKey *rsa.PublicKey,
) (*AccessClaims, error) {

	token, err := jwt.ParseWithClaims(
		tokenString,
		&AccessClaims{},
		func(t *jwt.Token) (interface{}, error) {

			// 🔥 Prevent algorithm attack
			if _, ok := t.Method.(*jwt.SigningMethodRSA); !ok {
				return nil, jwt.ErrSignatureInvalid
			}

			return publicKey, nil
		},
	)

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*AccessClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
