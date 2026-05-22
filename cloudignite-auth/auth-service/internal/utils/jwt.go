package utils

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"math/big"
	"time"

	"crypto/x509"
	"encoding/json"
	"encoding/pem"
	"net/http"
	"sync"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

//////////////////////////////////////////////////////
// VERIFY ACCESS TOKEN (RS256)
//////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////
// GENERATE ACCESS TOKEN (RS256)
//////////////////////////////////////////////////////

// ============================================
// GENERATE ACCESS TOKEN
// ============================================

func GenerateAccessToken(
	userID string,
	projectID string,
	email string,

	sessionID string,
	deviceID string,

	privateKey *rsa.PrivateKey,
	keyID string,
) (string, error) {

	now := time.Now()

	claims := AccessClaims{
		UserID:    userID,
		ProjectID: projectID,
		Email:     email,

		SessionID: sessionID,
		DeviceID:  deviceID,

		RegisteredClaims: jwt.RegisteredClaims{
			Subject:  userID,
			Issuer:   "cloudignite-auth",
			Audience: jwt.ClaimStrings{projectID},

			ExpiresAt: jwt.NewNumericDate(
				now.Add(15 * time.Minute),
			),

			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),

			ID: uuid.New().String(), // jti
		},
	}

	token := jwt.NewWithClaims(
		jwt.SigningMethodRS256,
		claims,
	)

	token.Header["kid"] = keyID

	return token.SignedString(privateKey)
}

func GenerateEmailToken() (raw string, hash string, err error) {

	bytes := make([]byte, 32)

	_, err = rand.Read(bytes)
	if err != nil {
		return
	}

	raw = base64.RawURLEncoding.EncodeToString(bytes)

	hashBytes := sha256.Sum256([]byte(raw))

	hash = hex.EncodeToString(hashBytes[:])

	return
}

func HashToken(token string) string {

	hash := sha256.Sum256([]byte(token))

	return hex.EncodeToString(hash[:])
}

var (
	keyCache = make(map[string]*rsa.PublicKey)
	mu       sync.RWMutex
)

//////////////////////////////////////////////////////
// GET PUBLIC KEY BY KID
//////////////////////////////////////////////////////

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

func buildRSAPublicKey(jwk JWK) (*rsa.PublicKey, error) {

	nBytes, err := base64.RawURLEncoding.DecodeString(jwk.N)
	if err != nil {
		return nil, err
	}

	eBytes, err := base64.RawURLEncoding.DecodeString(jwk.E)
	if err != nil {
		return nil, err
	}

	n := new(big.Int).SetBytes(nBytes)
	e := int(new(big.Int).SetBytes(eBytes).Int64())

	return &rsa.PublicKey{
		N: n,
		E: e,
	}, nil
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

//////////////////////////////////////////////////////
// FETCH FROM AUTH SERVICE (JWKS)
//////////////////////////////////////////////////////

func fetchPublicKeyFromAuth(kid string) (string, error) {

	// ⚠️ Replace with your real endpoint
	url := "https://auth.cloudignite.in/.well-known/jwks"

	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var result struct {
		Keys []struct {
			Kid       string `json:"kid"`
			PublicKey string `json:"public_key"`
		} `json:"keys"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", err
	}

	for _, k := range result.Keys {
		if k.Kid == kid {
			return k.PublicKey, nil
		}
	}

	return "", errors.New("key not found")
}

//////////////////////////////////////////////////////
// PARSE PUBLIC KEY
//////////////////////////////////////////////////////

func ParsePublicKey(pemStr string) (*rsa.PublicKey, error) {

	block, _ := pem.Decode([]byte(pemStr))
	if block == nil {
		return nil, errors.New("invalid public key")
	}

	return x509.ParsePKCS1PublicKey(block.Bytes)
}

var jwksCache = make(map[string]interface{})
var jwksMu sync.Mutex

func InvalidateJWKSCache(projectID string) {
	jwksMu.Lock()
	delete(jwksCache, projectID)
	jwksMu.Unlock()
}

func GenerateSecureHex(n int) (string, error) {

	b := make([]byte, n)

	if _, err := rand.Read(b); err != nil {
		return "", err
	}

	return hex.EncodeToString(b), nil
}

func GenerateRSAKeys() (string, string, error) {

	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		return "", "", err
	}

	// Private key
	privBytes := x509.MarshalPKCS1PrivateKey(privateKey)
	privPem := pem.EncodeToMemory(&pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: privBytes,
	})

	// Public key
	pubBytes := x509.MarshalPKCS1PublicKey(&privateKey.PublicKey)
	pubPem := pem.EncodeToMemory(&pem.Block{
		Type:  "RSA PUBLIC KEY",
		Bytes: pubBytes,
	})

	return string(privPem), string(pubPem), nil
}
