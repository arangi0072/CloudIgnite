// internal/model/policy.go
package model

type Policy struct {
	Version    string      `json:"version"`
	Statements []Statement `json:"statements"`
}

type Statement struct {
	Effect    string   `json:"effect"`             // allow | deny
	Actions   []string `json:"actions"`            // read, write
	Principal string   `json:"principal"`          // "*", "authenticated", "user:*", "user:<id>"
	Resource  string   `json:"resource,omitempty"` // optional: "path/{user_id}/*", "*", "z/*", "z/file.txt"
}
