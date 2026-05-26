# 🗄️ Storage Service

A self-hosted, project-scoped object storage microservice built with **Go**, **Gin**, and **MinIO**. It provides a clean REST API to manage buckets, upload/download files, control access policies, and handle object metadata — all secured with JWT authentication and API key validation.

---

## 📚 Table of Contents

- [What Is This?](#-what-is-this)
- [How It Works (Big Picture)](#-how-it-works-big-picture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Authentication](#-authentication)
  - [API Key (x-api-key)](#1-api-key-x-api-key)
  - [JWT Bearer Token](#2-jwt-bearer-token)
  - [Secret Key](#3-secret-key-sk_ci_)
- [API Reference](#-api-reference)
  - [Bucket Endpoints](#bucket-endpoints)
  - [Policy Endpoints](#policy-endpoints)
  - [Upload Endpoints](#upload-endpoints)
  - [Object Endpoints](#object-endpoints)
  - [Metadata Endpoints](#metadata-endpoints)
  - [Presigned URL Endpoints](#presigned-url-endpoints)
  - [Download Endpoints](#download-endpoints)
- [Upload Flow (Step-by-Step)](#-upload-flow-step-by-step)
- [Error Responses](#-error-responses)
- [Middleware Explained](#-middleware-explained)
- [Architecture Decisions](#-architecture-decisions)
- [Common Mistakes & Troubleshooting](#-common-mistakes--troubleshooting)

---

## 🤔 What Is This?

This is a **storage microservice** — think of it as a mini version of AWS S3, but one you run yourself. It lets your applications:

- Create and manage **buckets** (folders that hold files)
- **Upload** files securely using a two-step upload flow
- **Download** files directly or via secure time-limited URLs
- Set **access policies** on buckets (who can read/write)
- Track **object versions** and **metadata**

> **New to microservices?** A microservice is just a small, focused web server that does one job well. This one handles file storage for your platform.

---

## 🔭 How It Works (Big Picture)

```
Your App / Client
      │
      │  HTTP Request
      ▼
┌─────────────────────────────────────┐
│           Storage Service           │
│                                     │
│  ┌──────────┐    ┌───────────────┐  │
│  │Middleware│───▶│   Handlers    │  │
│  │          │    │  (bucket,obj) │  │
│  │- API Key │    └──────┬────────┘  │
│  │- JWT     │           │           │
│  └──────────┘    ┌──────▼────────┐  │
│                  │   Services    │  │
│                  │ (business     │  │
│                  │   logic)      │  │
│                  └──────┬────────┘  │
│                  ┌──────▼────────┐  │
│                  │ Repositories  │  │
│                  │  (database)   │  │
│                  └──────┬────────┘  │
└─────────────────────────┼───────────┘
                          │
              ┌───────────▼──────────┐
              │   MinIO (S3-compat.) │
              │   + PostgreSQL/DB    │
              └──────────────────────┘
```

Every request flows through **middleware** (security checks) → **handler** (parse the request) → **service** (apply business rules) → **repository** (talk to the database/storage).

---

## 📁 Project Structure

```
storage-service/
├── main.go                        # Entry point — starts the server
├── .env                           # Environment variables (never commit this!)
├── internal/
│   ├── app/
│   │   ├── app.go                 # Wires together repos, services, handlers
│   │   └── routes.go              # All HTTP routes defined here
│   ├── handler/
│   │   ├── bucket_handler.go      # HTTP handlers for bucket operations
│   │   └── object_handler.go      # HTTP handlers for object operations
│   ├── service/
│   │   ├── bucket_service.go      # Business logic for buckets
│   │   └── object_service.go      # Business logic for objects
│   ├── repository/
│   │   ├── bucket_repository.go   # Database queries for buckets
│   │   └── object_repository.go   # Database queries for objects
│   ├── middleware/
│   │   └── middleware.go          # Auth middleware (API key + JWT)
│   ├── model/
│   │   └── policy.go              # Data models / structs
│   ├── db/
│   │   └── db.go                  # Database connection setup
│   ├── storage/
│   │   └── minio.go               # MinIO client initialization
│   └── utils/
│       └── utils.go               # Helper functions (JWT verify, key lookup)
```

> **What is `internal/`?** In Go, anything inside `internal/` can only be used by code within this project — it can't be imported by external packages. This is a Go convention for keeping implementation details private.

---

## ✅ Prerequisites

Before running this service, make sure you have the following installed:

| Tool | Version | Purpose | Install |
|------|---------|---------|---------|
| Go | 1.21+ | Run the server | [go.dev/dl](https://go.dev/dl/) |
| MinIO | Latest | Object storage backend | [min.io/download](https://min.io/download) |
| PostgreSQL | 13+ | Metadata & policy storage | [postgresql.org](https://www.postgresql.org/download/) |
| Git | Any | Clone this repo | [git-scm.com](https://git-scm.com) |

> **New to MinIO?** MinIO is an open-source file storage server that speaks the same language as Amazon S3. You can run it locally on your own computer — it stores files in a folder on your disk.

---

## 🚀 Getting Started

### Step 1 — Clone the repository

```bash
git clone https://github.com/your-org/storage-service.git
cd storage-service
```

### Step 2 — Install Go dependencies

```bash
go mod download
```

This downloads all the libraries this project needs (Gin, JWT, MinIO client, etc.).

### Step 3 — Start MinIO locally

```bash
# Run MinIO with Docker (easiest way)
docker run -p 9000:9000 -p 9001:9001 \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  quay.io/minio/minio server /data --console-address ":9001"
```

MinIO will be available at `http://localhost:9000`. Open the console at `http://localhost:9001` to manage it visually.

### Step 4 — Set up the database

```bash
# Run PostgreSQL with Docker
docker run -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=storage_db \
  -d postgres:15
```

### Step 5 — Configure environment variables

```bash
cp .env.example .env
# Edit .env with your actual values (see Environment Variables section below)
```

### Step 6 — Run the service

```bash
go run main.go
```

You should see:
```
Storage service running on 8082
```

The API is now live at `http://localhost:8082`.

---

## 🔧 Environment Variables

Create a `.env` file in the project root. Here is a full reference:

```env
# ── Server ────────────────────────────────────────────
PORT=8082                          # Port the HTTP server listens on

# ── Database ──────────────────────────────────────────
STORAGE_DB_HOST=localhost          # PostgreSQL host
STORAGE_DB_PORT=5432               # PostgreSQL port
STORAGE_DB_USER=postgres           # Database username
STORAGE_DB_PASSWORD=postgres       # Database password
STORAGE_DB_NAME=storage_db         # Database name

# ── MinIO ─────────────────────────────────────────────
MINIO_ENDPOINT=localhost:9000      # MinIO server address
MINIO_ACCESS_KEY=minioadmin        # MinIO root user
MINIO_SECRET_KEY=minioadmin        # MinIO root password
MINIO_USE_SSL=false                # Set to true in production with HTTPS

# ── Auth Service ──────────────────────────────────────
AUTH_SERVICE_URL=http://localhost:8081   # URL of your auth service
                                         # (used to fetch RSA public keys)
```

> ⚠️ **Never commit your `.env` file to Git.** Add it to `.gitignore`. It contains secrets that should never be public.

---

## 🔐 Authentication

Every request to this service must be authenticated. There are **three authentication mechanisms**, and all routes under `/v1/storage` require **both** the API Key and a JWT token.

### 1. API Key (`x-api-key`)

**What it is:** A string key issued to your project. It identifies *which project* the request belongs to.

**How it works:**
1. You send your API key in the request header: `x-api-key: your-key-here`
2. The server hashes the key using SHA-256
3. It looks up the hash in the database to find the matching project
4. If found, it sets `project_id` in the request context for later use

**Header name:** `x-api-key`

```bash
# Example
curl -H "x-api-key: myapikey123" http://localhost:8082/v1/storage/list?bucket=photos
```

> **Why hash the key?** The server never stores the raw key — only its SHA-256 hash. Even if the database is compromised, attackers can't recover the original key.

---

### 2. JWT Bearer Token

**What it is:** A signed JSON Web Token proving the identity of a logged-in user.

**How it works:**
1. You send the token in the `Authorization` header: `Authorization: Bearer <token>`
2. The server extracts the `kid` (Key ID) from the token header — this tells it *which* RSA key was used to sign the token
3. It fetches the corresponding RSA public key from your auth service
4. It verifies the token's signature using that public key
5. If valid, it attaches user info (`user_id`, `email`, `project_id`, `session_id`, `device_id`) to the request context

**Header name:** `Authorization: Bearer <token>`

```bash
# Example
curl \
  -H "x-api-key: myapikey123" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImtleS0xIn0..." \
  http://localhost:8082/v1/storage/list?bucket=photos
```

> **What is a JWT?** A JWT (JSON Web Token) is like a tamper-proof ID card. It contains claims (who you are, when it expires) and is signed by a private key. Anyone with the matching public key can verify it wasn't modified.

---

### 3. Secret Key (`sk_ci_...`)

Used for server-to-server (CI/CD or backend) requests. These keys must start with the prefix `sk_ci_`.

**Header:** `Authorization: Bearer sk_ci_yoursecretkey`

This middleware (`SecretKeyMiddleware`) is available for routes that need server-to-server authentication instead of user JWTs.

---

## 📡 API Reference

**Base URL:** `http://localhost:8082/v1/storage`

**Required headers for all endpoints:**
```
x-api-key: <your-api-key>
Authorization: Bearer <jwt-token>
Content-Type: application/json   (for POST/PATCH/PUT with body)
```

---

### Bucket Endpoints

Buckets are top-level containers for your files — similar to folders or S3 buckets.

---

#### `GET /buckets/:bucket` — Get Bucket Info

Retrieves details about a specific bucket.

**URL Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `bucket` | string | The bucket name or ID |

**Success Response `200`:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "user-uploads",
  "project_id": "proj_abc123",
  "quota_bytes": 5368709120,
  "is_public": false,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Error Response `404`:**
```json
{
  "error": "bucket not found"
}
```

**Example:**
```bash
curl -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     http://localhost:8082/v1/storage/buckets/user-uploads
```

---

#### `PATCH /buckets/:bucket` — Update Bucket

Updates a bucket's storage quota or public/private visibility.

**URL Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `bucket` | string | The bucket name or ID |

**Request Body:**
```json
{
  "quota_bytes": 10737418240,
  "is_public": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `quota_bytes` | integer | No | Max storage in bytes (e.g. `5368709120` = 5 GB) |
| `is_public` | boolean | No | If `true`, objects can be accessed without auth |

> Both fields are optional pointers — you can send just one or both.

**Success Response `200`:**
```json
{
  "message": "bucket updated"
}
```

**Example:**
```bash
curl -X PATCH \
     -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"quota_bytes": 10737418240, "is_public": false}' \
     http://localhost:8082/v1/storage/buckets/user-uploads
```

---

#### `DELETE /buckets/:bucket` — Delete Bucket

Deletes a bucket. The bucket **must be empty** before it can be deleted.

**URL Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `bucket` | string | The bucket name or ID |

**Success Response `200`:**
```json
{
  "message": "bucket deleted"
}
```

**Error Response `400` (bucket not empty):**
```json
{
  "error": "bucket not empty"
}
```

**Example:**
```bash
curl -X DELETE \
     -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     http://localhost:8082/v1/storage/buckets/old-bucket
```

---

### Policy Endpoints

Policies control fine-grained access rules on a bucket (e.g. who can read, who can write).

---

#### `PUT /buckets/:bucket/policy` — Set Bucket Policy

Sets or replaces the access policy for a bucket.

**URL Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `bucket` | string | The bucket name |

**Request Body** (structure depends on your `model.Policy` definition):
```json
{
  "effect": "allow",
  "actions": ["read", "write"],
  "principals": ["user:alice", "role:editor"]
}
```

**Success Response `200`:**
```json
{
  "message": "policy set successfully"
}
```

**Example:**
```bash
curl -X PUT \
     -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"effect":"allow","actions":["read"],"principals":["*"]}' \
     http://localhost:8082/v1/storage/buckets/public-assets/policy
```

---

#### `GET /buckets/:bucket/policy` — Get Bucket Policy

Retrieves the current access policy of a bucket.

**URL Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `bucket` | string | The bucket name |

**Success Response `200` (policy exists):**
```json
{
  "policy": {
    "effect": "allow",
    "actions": ["read"],
    "principals": ["*"]
  }
}
```

**Success Response `200` (no policy set):**
```json
{
  "policy": null,
  "message": "no policy set (default = deny)"
}
```

> **Default behavior:** If no policy is set, access is **denied** by default. You must explicitly allow access.

---

### Upload Endpoints

File uploads use a **two-step process** to ensure reliability and security:

1. **Init** — Tell the server you want to upload (get back a pre-signed URL and an `object_id`)
2. **Confirm** — Tell the server the upload is complete (validates the upload token)

> **Why two steps?** This pattern (sometimes called a "presigned upload") means the actual file bytes go directly from your client to MinIO — they never pass through this API server. This saves bandwidth and is much faster for large files.

---

#### `POST /upload/init` — Initialize Upload

Registers an upload intent and returns a pre-signed URL to upload the file directly to MinIO.

**Request Body:**
```json
{
  "bucket": "550e8400-e29b-41d4-a716-446655440000",
  "key": "avatars/user123.png",
  "content_type": "image/png"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bucket` | string (UUID) | Yes | The UUID of the target bucket |
| `key` | string | Yes | The file path/name inside the bucket (e.g. `folder/file.png`) |
| `content_type` | string | Yes | MIME type of the file (e.g. `image/png`, `application/pdf`) |

> ⚠️ The `bucket` field must be a valid UUID (like `550e8400-e29b-41d4-a716-446655440000`), not a bucket name string.

**Success Response `200`:**
```json
{
  "object_id": "obj_789xyz",
  "upload_url": "https://minio.example.com/bucketname/key?X-Amz-Signature=...",
  "upload_token": "tok_abc123"
}
```

| Field | Description |
|-------|-------------|
| `object_id` | Internal ID of the newly created object record |
| `upload_url` | Pre-signed MinIO URL — PUT your file bytes here directly |
| `upload_token` | Token to use in the Confirm step |

**Example:**
```bash
# Step 1: Init
curl -X POST \
     -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"bucket":"550e8400-e29b-41d4-a716-446655440000","key":"docs/report.pdf","content_type":"application/pdf"}' \
     http://localhost:8082/v1/storage/upload/init
```

---

#### `POST /upload/confirm` — Confirm Upload

Confirms that the file was successfully uploaded to MinIO and marks the object as active.

**Request Body:**
```json
{
  "object_id": "obj_789xyz"
}
```

**Required Header:**
```
Upload-Token: tok_abc123
```

| Header | Description |
|--------|-------------|
| `Upload-Token` | The token received from the Init step |

**Success Response `200`:**
```json
{
  "id": "obj_789xyz",
  "key": "docs/report.pdf",
  "bucket": "user-uploads",
  "size": 204800,
  "content_type": "application/pdf",
  "confirmed_at": "2024-01-15T10:35:00Z"
}
```

**Error Response `403`:**
```json
{
  "error": "invalid or expired upload token"
}
```

**Example:**
```bash
# Step 2: Confirm
curl -X POST \
     -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -H "Upload-Token: tok_abc123" \
     -d '{"object_id":"obj_789xyz"}' \
     http://localhost:8082/v1/storage/upload/confirm
```

---

#### Complete Upload Example (Shell Script)

```bash
#!/bin/bash

API_BASE="http://localhost:8082/v1/storage"
API_KEY="myapikey"
JWT="eyJhbGci..."
FILE_PATH="./my-document.pdf"
BUCKET_UUID="550e8400-e29b-41d4-a716-446655440000"

# 1. Init upload
INIT=$(curl -s -X POST "$API_BASE/upload/init" \
  -H "x-api-key: $API_KEY" \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d "{\"bucket\":\"$BUCKET_UUID\",\"key\":\"docs/my-document.pdf\",\"content_type\":\"application/pdf\"}")

UPLOAD_URL=$(echo $INIT | jq -r '.upload_url')
OBJECT_ID=$(echo $INIT | jq -r '.object_id')
UPLOAD_TOKEN=$(echo $INIT | jq -r '.upload_token')

# 2. Upload directly to MinIO
curl -s -X PUT "$UPLOAD_URL" \
  -H "Content-Type: application/pdf" \
  --data-binary @"$FILE_PATH"

# 3. Confirm upload
curl -s -X POST "$API_BASE/upload/confirm" \
  -H "x-api-key: $API_KEY" \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -H "Upload-Token: $UPLOAD_TOKEN" \
  -d "{\"object_id\":\"$OBJECT_ID\"}"

echo "Upload complete!"
```

---

### Object Endpoints

---

#### `GET /list` — List Objects

Lists all objects in a bucket, with optional prefix filtering (like listing files in a subfolder).

**Query Parameters:**

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `bucket` | Yes | Bucket name | `user-uploads` |
| `prefix` | No | Filter by path prefix (default: `""` = all) | `avatars/` |

**Success Response `200`:**
```json
[
  {
    "key": "avatars/user1.png",
    "size": 45678,
    "content_type": "image/png",
    "last_modified": "2024-01-10T08:00:00Z"
  },
  {
    "key": "avatars/user2.jpg",
    "size": 32100,
    "content_type": "image/jpeg",
    "last_modified": "2024-01-11T09:30:00Z"
  }
]
```

**Example:**
```bash
# List all objects in a bucket
curl -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     "http://localhost:8082/v1/storage/list?bucket=user-uploads"

# List only objects in the 'avatars/' folder
curl -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     "http://localhost:8082/v1/storage/list?bucket=user-uploads&prefix=avatars/"
```

---

#### `DELETE /object` — Delete Single Object

Permanently deletes a single object from a bucket.

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `bucket` | Yes | Bucket name |
| `key` | Yes | Object key (file path) |

**Success Response `200`:**
```json
{
  "message": "object deleted"
}
```

**Example:**
```bash
curl -X DELETE \
     -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     "http://localhost:8082/v1/storage/object?bucket=user-uploads&key=avatars/old-photo.png"
```

---

#### `POST /object/delete-multiple` — Delete Multiple Objects

Deletes several objects in a single request. More efficient than calling delete one-by-one.

**Request Body:**
```json
{
  "bucket": "user-uploads",
  "keys": [
    "temp/file1.txt",
    "temp/file2.txt",
    "temp/file3.txt"
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bucket` | string | Yes | Bucket name |
| `keys` | array of strings | Yes | List of object keys to delete |

**Success Response `200`:**
```json
{
  "message": "objects deleted"
}
```

**Example:**
```bash
curl -X POST \
     -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"bucket":"user-uploads","keys":["temp/a.txt","temp/b.txt"]}' \
     http://localhost:8082/v1/storage/object/delete-multiple
```

---

#### `PATCH /object/rename` — Rename Object

Renames (moves) an object within a bucket by changing its key.

**Request Body:**
```json
{
  "bucket": "user-uploads",
  "old_key": "docs/draft-report.pdf",
  "new_key": "docs/final-report.pdf"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bucket` | string | Yes | Bucket containing the object |
| `old_key` | string | Yes | Current object key |
| `new_key` | string | Yes | New object key |

**Success Response `200`:**
```json
{
  "message": "object renamed"
}
```

**Example:**
```bash
curl -X PATCH \
     -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"bucket":"user-uploads","old_key":"docs/draft.pdf","new_key":"docs/final.pdf"}' \
     http://localhost:8082/v1/storage/object/rename
```

---

#### `GET /object/versions` — Get Object Versions

Retrieves the version history of an object (if versioning is enabled on the bucket).

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `bucket` | Yes | Bucket name |
| `key` | Yes | Object key |

**Success Response `200`:**
```json
{
  "versions": [
    {
      "version_id": "v3",
      "size": 20480,
      "last_modified": "2024-01-15T10:00:00Z",
      "is_latest": true
    },
    {
      "version_id": "v2",
      "size": 18000,
      "last_modified": "2024-01-10T08:00:00Z",
      "is_latest": false
    }
  ]
}
```

**Example:**
```bash
curl -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     "http://localhost:8082/v1/storage/object/versions?bucket=user-uploads&key=docs/report.pdf"
```

---

### Metadata Endpoints

Metadata stores information *about* an object (like its content type, custom tags) without touching the file itself.

---

#### `GET /meta` — Get Object Metadata

Retrieves the stored metadata record for an object.

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `bucket` | Yes | Bucket name |
| `key` | Yes | Object key |

**Success Response `200`:**
```json
{
  "id": "obj_789xyz",
  "project_id": "proj_abc",
  "bucket": "user-uploads",
  "key": "avatars/user1.png",
  "content_type": "image/png",
  "size": 45678,
  "created_at": "2024-01-10T08:00:00Z"
}
```

**Error Response `404`:**
```json
{
  "error": "not found"
}
```

**Example:**
```bash
curl -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     "http://localhost:8082/v1/storage/meta?bucket=user-uploads&key=avatars/user1.png"
```

---

#### `PATCH /meta` — Update Object Metadata

Updates the metadata for an existing object (e.g. correcting the content type).

**Request Body:**
```json
{
  "bucket": "user-uploads",
  "key": "avatars/user1.png",
  "content_type": "image/webp"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bucket` | string | Yes | Bucket name |
| `key` | string | Yes | Object key |
| `content_type` | string | Yes | New MIME type to set |

**Success Response `200`:**
```json
{
  "message": "updated"
}
```

**Example:**
```bash
curl -X PATCH \
     -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"bucket":"user-uploads","key":"avatars/user1.png","content_type":"image/webp"}' \
     http://localhost:8082/v1/storage/meta
```

---

### Presigned URL Endpoints

Presigned URLs are **temporary, time-limited URLs** that give anyone who has the URL access to a specific object — without needing an API key or JWT. Great for sharing files or embedding them in a browser.

---

#### `GET /presigned/preview` — Generate Preview URL

Generates a short-lived URL to preview (view inline in browser) an object.

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `bucket` | Yes | Bucket name |
| `key` | Yes | Object key |

**Success Response `200`:**
```json
{
  "url": "https://minio.example.com/user-uploads/avatars/user1.png?X-Amz-Expires=3600&X-Amz-Signature=..."
}
```

**Example:**
```bash
curl -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     "http://localhost:8082/v1/storage/presigned/preview?bucket=user-uploads&key=avatars/user1.png"

# Then open the returned URL in a browser to preview the image
```

---

#### `GET /presigned/download` — Generate Download URL

Generates a time-limited URL that triggers a file download (with proper `Content-Disposition` headers).

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `bucket` | Yes | Bucket name |
| `key` | Yes | Object key |

**Success Response `200`:**
```json
{
  "url": "https://minio.example.com/user-uploads/docs/report.pdf?response-content-disposition=attachment&X-Amz-Signature=..."
}
```

**Example:**
```bash
curl -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     "http://localhost:8082/v1/storage/presigned/download?bucket=user-uploads&key=docs/report.pdf"
```

---

### Download Endpoints

---

#### `GET /download` — Stream File Through Backend

Downloads a file by streaming it through this service (rather than redirecting to MinIO directly). Useful when you want to enforce access control or add processing.

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `bucket` | Yes | Bucket name |
| `key` | Yes | Object key |

**Response Headers set automatically:**
```
Content-Disposition: attachment; filename="report.pdf"
Content-Type: application/pdf
Cache-Control: private, max-age=3600
```

**Response body:** Raw binary file bytes.

**Example:**
```bash
curl -H "x-api-key: mykey" \
     -H "Authorization: Bearer <token>" \
     "http://localhost:8082/v1/storage/download?bucket=user-uploads&key=docs/report.pdf" \
     --output report.pdf
```

> **Presigned URL vs Streaming download:** Use presigned URLs for large files or public sharing (faster, no server load). Use `/download` when you need server-side access control or logging on every download.

---

## 🔄 Upload Flow (Step-by-Step)

Here is a visual walkthrough of the two-step upload process:

```
Client                    Storage Service              MinIO
  │                             │                        │
  │  POST /upload/init          │                        │
  │  { bucket, key, type }      │                        │
  │────────────────────────────▶│                        │
  │                             │  Create object record  │
  │                             │  Generate presigned URL│
  │                             │────────────────────────▶
  │                             │  ◀── presigned PUT URL ─
  │  ◀── { upload_url,          │                        │
  │        object_id,           │                        │
  │        upload_token } ──────│                        │
  │                             │                        │
  │  PUT <upload_url>           │                        │
  │  (raw file bytes)           │                        │
  │─────────────────────────────┼───────────────────────▶│
  │  ◀── 200 OK ────────────────┼────────────────────────│
  │                             │                        │
  │  POST /upload/confirm       │                        │
  │  { object_id }              │                        │
  │  Upload-Token: <token>      │                        │
  │────────────────────────────▶│                        │
  │                             │  Mark object confirmed │
  │  ◀── { confirmed object } ──│                        │
```

---

## ❌ Error Responses

All error responses follow this format:

```json
{
  "error": "human readable error message"
}
```

| HTTP Status | Meaning | Common Causes |
|-------------|---------|---------------|
| `400` | Bad Request | Missing required field, invalid JSON body, bucket not empty on delete |
| `401` | Unauthorized | Missing/invalid API key, missing/expired JWT token |
| `403` | Forbidden | Invalid upload token on confirm |
| `404` | Not Found | Bucket or object doesn't exist |
| `500` | Internal Server Error | Database error, MinIO unreachable, unexpected failure |

---

## 🧩 Middleware Explained

Middleware runs before every request handler and is used for cross-cutting concerns like authentication.

### ProjectMiddleware

```
Request → [ProjectMiddleware] → sets project_id → [JWTMiddleware] → sets user info → Handler
```

`ProjectMiddleware` reads the `x-api-key` header, hashes it with SHA-256, and looks up the matching project in the database. If found, it stores the `project_id` in the Gin context so all subsequent handlers can access it via `c.GetString("project_id")`.

### JWTMiddleware

After the API key is validated, `JWTMiddleware` validates the Bearer token. It:
1. Parses the token without verifying (to extract the `kid` from the header)
2. Fetches the RSA public key for that `kid` from the auth service
3. Verifies the full token with that public key
4. Sets `user_id`, `email`, `project_id`, `session_id`, and `device_id` on the context

This design supports **key rotation** — different tokens can be signed with different keys, identified by `kid`.

---

## 🏗️ Architecture Decisions

**Why Gin?** Gin is a fast, minimal HTTP framework for Go with excellent middleware support and a clean routing API.

**Why two-step uploads?** Direct-to-MinIO uploads via presigned URLs avoid routing large file payloads through the API server, reducing load and improving throughput.

**Why SHA-256 for API key storage?** Hashing is a one-way operation. The database only stores hashes, so a database breach doesn't expose usable API keys.

**Why RSA + KID?** Using asymmetric (RSA) JWT signing means the auth service keeps the private key secret, while any service can verify tokens using only the public key. The `kid` field enables key rotation without breaking existing tokens.

**Why `internal/`?** Go's `internal` package convention prevents external packages from importing service internals, enforcing clean boundaries.

---

## 🐛 Common Mistakes & Troubleshooting

**`panic: failed to load env`**
Your `.env` file is missing or not in the project root. Run `cp .env.example .env` and fill in the values.

**`401 missing api key`**
You forgot to include the `x-api-key` header, or the key is invalid. Double-check the header name — it's lowercase `x-api-key`.

**`400 invalid UUID` on /upload/init**
The `bucket` field in the request body must be a UUID (e.g. `550e8400-e29b-41d4-a716-446655440000`), not a bucket name string. Fetch the bucket's UUID first using `GET /buckets/:bucket`.

**`403 invalid or expired upload token` on /upload/confirm**
Upload tokens are single-use and time-limited. You must confirm promptly after the init step. Do not reuse a token from a previous init.

**`500` on all requests**
Check that MinIO and your database are running and reachable. Look at the server logs for the specific error message.

**Objects visible in MinIO but not in the API**
The object may not have been confirmed (`POST /upload/confirm`). Unconfirmed objects are in MinIO but not marked active in the database.

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

> Built with ❤️ using [Go](https://golang.org), [Gin](https://github.com/gin-gonic/gin), and [MinIO](https://min.io).