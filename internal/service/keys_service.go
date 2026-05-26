package service

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"

	"cloudignite-auth/internal/repository"
	cloudutils "cloudignite-auth/internal/utils"
)

//////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////

func generateSecureHex(n int) string {
	b := make([]byte, n)
	rand.Read(b)
	return hex.EncodeToString(b)
}

func hashKey(k string) string {
	sum := sha256.Sum256([]byte(k))
	return hex.EncodeToString(sum[:])
}

//////////////////////////////////////////////////////
// ROTATE SECRET
//////////////////////////////////////////////////////

func RotateSecret(serviceID string) (string, error) {

	secret := "sk_ci_" + generateSecureHex(32)

	hash := hashKey(secret)

	preview := secret[:12] + "..."

	err := repository.RotateSecretTx(serviceID, hash, preview)
	if err != nil {
		return "", err
	}

	return secret, nil
}

//////////////////////////////////////////////////////
// GET INITIAL SECRET
//////////////////////////////////////////////////////

func GetInitialSecret(serviceID string) (string, error) {

	encrypted, err := repository.GetInitialSecret(serviceID)
	if err != nil {
		return "", err
	}

	return cloudutils.DecryptWithMasterKey(encrypted)
}
