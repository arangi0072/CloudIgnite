package models

type Quotas struct {
	Auth struct {
		APICalls int64 `json:"api_calls"`
	} `json:"auth"`

	SMTP struct {
		EmailsSent int64 `json:"emails_sent"`
	} `json:"smtp"`

	Functions struct {
		Invocations int64 `json:"invocations"`
	} `json:"functions"`

	Storage struct {
		StorageUsed int64 `json:"storage_used"`
		Bandwidth   int64 `json:"bandwidth"`
	} `json:"storage"`
}
