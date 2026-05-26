# Auth Service — API Documentation

---

## Table of Contents

- [Authentication](#authentication)
- [Email Management](#email-management)
- [Sessions](#sessions)
- [Admin](#admin)

---

## Authentication

Base path: `/auth`

---

### POST `/auth/signup`

Register a new user under a project.

**Request Body**

| Field      | Type   | Required | Validation     |
|------------|--------|----------|----------------|
| `email`    | string | Yes      | Valid email    |
| `password` | string | Yes      | Min 6 chars   |

**Responses**

| Status | Description              |
|--------|--------------------------|
| `201`  | User created             |
| `400`  | Invalid payload or error |

**Example Request**
```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

**Example Response**
```json
{ "status": "user created" }
```

---

### POST `/auth/login`

Authenticate a user and return access + refresh tokens.

**Request Body**

| Field         | Type   | Required | Description              |
|---------------|--------|----------|--------------------------|
| `email`       | string | Yes      | User's email             |
| `password`    | string | Yes      | User's password          |
| `device_id`   | string | Yes      | Unique device identifier |
| `device_name` | string | No       | Human-readable device    |
| `fingerprint` | string | No       | Browser/device fingerprint |

**Responses**

| Status | Description         |
|--------|---------------------|
| `200`  | Login successful    |
| `401`  | Invalid credentials |

**Example Response**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "dGhp...",
  "expires_in": 900,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "verified": true
  }
}
```

---

### POST `/auth/logout`

Revoke the current session (requires valid access token).

**Headers**

| Header          | Value              |
|-----------------|--------------------|
| `Authorization` | `Bearer <token>`   |

**Responses**

| Status | Description              |
|--------|--------------------------|
| `200`  | Logged out               |
| `401`  | Missing or invalid session |
| `500`  | Failed to revoke session |

**Example Response**
```json
{ "status": "logged out" }
```

---

### POST `/auth/logout-all`

Revoke all sessions for the authenticated user.

**Headers**

| Header          | Value            |
|-----------------|------------------|
| `Authorization` | `Bearer <token>` |

**Responses**

| Status | Description                |
|--------|----------------------------|
| `200`  | All sessions revoked       |
| `500`  | Failed to revoke sessions  |

**Example Response**
```json
{ "status": "all sessions revoked" }
```

---

### GET `/auth/me`

Return the authenticated user's profile.

**Headers**

| Header          | Value            |
|-----------------|------------------|
| `Authorization` | `Bearer <token>` |

**Responses**

| Status | Description    |
|--------|----------------|
| `200`  | User object    |
| `404`  | User not found |

---

### POST `/auth/refresh`

Exchange a refresh token for a new access + refresh token pair. Implements replay detection — using a refresh token twice revokes the entire session.

**Request Body**

| Field          | Type   | Required |
|----------------|--------|----------|
| `refreshToken` | string | Yes      |

**Responses**

| Status | Description                          |
|--------|--------------------------------------|
| `200`  | New token pair issued                |
| `400`  | Invalid request                      |
| `401`  | Invalid/used/revoked refresh token   |
| `500`  | Internal token rotation error        |

**Example Response**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "dGhp...",
  "expires_in": 900
}
```

> ⚠️ **Replay Detection:** If a refresh token is used more than once, the system immediately revokes the entire session and returns `401`.

---

### GET `/auth/verify-email?token=<token>`

Verify a user's email address using the token sent via email.

**Query Parameters**

| Param   | Required | Description         |
|---------|----------|---------------------|
| `token` | Yes      | Email verify token  |

**Responses**

| Status | Description       |
|--------|-------------------|
| `200`  | Email verified    |
| `400`  | Invalid token     |

**Example Response**
```json
{ "status": "email verified" }
```

---

### POST `/auth/forgot-password`

Trigger a password reset email. Always returns `200` to prevent user enumeration.

**Request Body**

| Field   | Type   | Required |
|---------|--------|----------|
| `email` | string | Yes      |

**Responses**

| Status | Description              |
|--------|--------------------------|
| `200`  | Reset email queued (if account exists) |

**Example Response**
```json
{ "status": "if account exists, reset email sent" }
```

---

### POST `/auth/reset-password`

Set a new password using a reset token.

**Request Body**

| Field          | Type   | Required |
|----------------|--------|----------|
| `token`        | string | Yes      |
| `new_password` | string | Yes      |

**Responses**

| Status | Description       |
|--------|-------------------|
| `200`  | Password updated  |
| `400`  | Invalid token     |

**Example Response**
```json
{ "status": "password updated" }
```

---

### GET `/.well-known/jwks/:project_id`

Return the public JWKS (JSON Web Key Set) for a project. Used by downstream services to verify JWTs.

**Path Parameters**

| Param        | Description |
|--------------|-------------|
| `project_id` | Project UUID |

**Responses**

| Status | Description   |
|--------|---------------|
| `200`  | JWKS payload  |
| `404`  | Project not found |

**Example Response**
```json
{
  "keys": [
    {
      "kid": "abc123",
      "alg": "RS256",
      "kty": "RSA",
      "use": "sig",
      "public_key": "-----BEGIN PUBLIC KEY-----..."
    }
  ]
}
```

---

### POST `/admin/projects/:id/rotate-keys`

Generate a new RSA key pair for a project and invalidate the JWKS cache. All existing JWTs signed with the old key will become invalid.

**Path Parameters**

| Param | Description  |
|-------|--------------|
| `id`  | Project UUID |

**Responses**

| Status | Description              |
|--------|--------------------------|
| `200`  | Keys rotated             |
| `500`  | Key generation failed    |

**Example Response**
```json
{
  "message": "keys rotated successfully",
  "key_id": "f3a9c2b1"
}
```

> ⚠️ **Warning:** Rotating keys invalidates all existing access tokens. Clients must re-authenticate.

---

## Email Management

Base path: `/user/email`

---

### POST `/user/email/resend-verification`

Resend the email verification link to the current user.

**Headers**

| Header          | Value            |
|-----------------|------------------|
| `Authorization` | `Bearer <token>` |

**Responses**

| Status | Description              |
|--------|--------------------------|
| `200`  | Verification sent        |
| `500`  | Internal error           |

**Example Response**
```json
{ "message": "verification sent" }
```

---

### POST `/user/email/change`

Initiate an email change. Sends a confirmation link to the new address.

**Headers**

| Header          | Value            |
|-----------------|------------------|
| `Authorization` | `Bearer <token>` |

**Request Body**

| Field       | Type   | Required |
|-------------|--------|----------|
| `new_email` | string | Yes      |

**Responses**

| Status | Description              |
|--------|--------------------------|
| `200`  | Confirmation email sent  |
| `400`  | Invalid request          |
| `500`  | Internal error           |

**Example Response**
```json
{ "message": "confirmation sent" }
```

---

### GET `/user/email/confirm-change?token=<token>`

Confirm an email change using the token sent to the new address.

**Query Parameters**

| Param   | Required | Description             |
|---------|----------|-------------------------|
| `token` | Yes      | Email change token      |

**Responses**

| Status | Description     |
|--------|-----------------|
| `200`  | Email updated   |
| `400`  | Invalid token   |

**Example Response**
```json
{ "message": "email updated" }
```

---

### GET `/user/email/status`

Get the current email verification status for the authenticated user.

**Headers**

| Header          | Value            |
|-----------------|------------------|
| `Authorization` | `Bearer <token>` |

**Responses**

| Status | Description          |
|--------|----------------------|
| `200`  | Email status object  |
| `500`  | Internal error       |

---

## Sessions

Base path: `/user/sessions`

---

### GET `/user/sessions`

List all active sessions for the authenticated user.

**Headers**

| Header          | Value            |
|-----------------|------------------|
| `Authorization` | `Bearer <token>` |

**Responses**

| Status | Description         |
|--------|---------------------|
| `200`  | Array of sessions   |
| `500`  | Failed to fetch     |

**Example Response**
```json
{
  "sessions": [
    {
      "id": "uuid",
      "device_id": "device-abc",
      "device_name": "Chrome on Mac",
      "last_seen_at": "2024-01-01T12:00:00Z",
      "ip": "1.2.3.4"
    }
  ]
}
```

---

### DELETE `/user/sessions/others`

Revoke all sessions except the current one.

**Headers**

| Header          | Value            |
|-----------------|------------------|
| `Authorization` | `Bearer <token>` |

**Responses**

| Status | Description              |
|--------|--------------------------|
| `200`  | Other sessions revoked   |
| `500`  | Failed to revoke         |

**Example Response**
```json
{ "message": "other sessions revoked" }
```

---

### DELETE `/user/sessions/:id`

Revoke a specific session by ID.

**Path Parameters**

| Param | Description  |
|-------|--------------|
| `id`  | Session UUID |

**Responses**

| Status | Description          |
|--------|----------------------|
| `200`  | Session revoked      |
| `500`  | Failed to revoke     |

**Example Response**
```json
{ "message": "session revoked" }
```

---

## Admin

Base path: `/admin`

> All admin endpoints require a valid admin API key or privileged token scoped to the project.

---

### POST `/admin/users`

Create a new user directly (bypasses email verification flow).

**Request Body**

| Field      | Type   | Required |
|------------|--------|----------|
| `email`    | string | Yes      |
| `password` | string | Yes      |

**Responses**

| Status | Description     |
|--------|-----------------|
| `201`  | User created    |
| `400`  | Invalid payload |
| `500`  | Internal error  |

**Example Response**
```json
{ "status": "user created" }
```

---

### GET `/admin/users`

List all users in the project.

**Responses**

| Status | Description       |
|--------|-------------------|
| `200`  | Array of users    |
| `500`  | Failed to fetch   |

---

### DELETE `/admin/users/:id`

Permanently delete a user from the project.

**Path Parameters**

| Param | Description |
|-------|-------------|
| `id`  | User UUID   |

**Responses**

| Status | Description      |
|--------|------------------|
| `200`  | User deleted     |
| `500`  | Failed to delete |

**Example Response**
```json
{ "status": "user deleted" }
```

---

### PATCH `/admin/users/:id/disable`

Disable a user account, preventing them from logging in.

**Path Parameters**

| Param | Description |
|-------|-------------|
| `id`  | User UUID   |

**Responses**

| Status | Description      |
|--------|------------------|
| `200`  | User disabled    |
| `500`  | Failed to disable|

**Example Response**
```json
{ "status": "user disabled" }
```

---

### DELETE `/admin/users/:id/sessions`

Revoke all active sessions for a specific user (force logout everywhere).

**Path Parameters**

| Param | Description |
|-------|-------------|
| `id`  | User UUID   |

**Responses**

| Status | Description         |
|--------|---------------------|
| `200`  | Sessions revoked    |
| `500`  | Failed to revoke    |

**Example Response**
```json
{ "status": "sessions revoked" }
```
