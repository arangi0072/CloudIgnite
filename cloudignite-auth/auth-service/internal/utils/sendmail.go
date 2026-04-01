package utils

import (
	"crypto/tls"
	"fmt"
	"net/smtp"
)

func SendEmail(to, subject, body string) error {

	config := LoadSMTPConfig()

	message := fmt.Sprintf(
		"From: %s\r\n"+
			"To: %s\r\n"+
			"Subject: %s\r\n"+
			"MIME-Version: 1.0\r\n"+
			"Content-Type: text/plain; charset=\"UTF-8\"\r\n"+
			"\r\n"+
			"%s\r\n",
		config.From,
		to,
		subject,
		body,
	)

	addr := fmt.Sprintf("%s:%d", config.Host, config.Port)

	conn, err := smtp.Dial(addr)
	if err != nil {
		return err
	}
	defer conn.Close()

	tlsconfig := &tls.Config{
		InsecureSkipVerify: true,
		ServerName:         config.Host,
	}

	if ok, _ := conn.Extension("STARTTLS"); ok {
		if err = conn.StartTLS(tlsconfig); err != nil {
			return err
		}
	}

	auth := smtp.PlainAuth(
		"",
		config.Username,
		config.Password,
		config.Host,
	)

	if err = conn.Auth(auth); err != nil {
		return err
	}

	if err = conn.Mail(config.From); err != nil {
		return err
	}

	if err = conn.Rcpt(to); err != nil {
		return err
	}

	w, err := conn.Data()
	if err != nil {
		return err
	}

	_, err = w.Write([]byte(message))
	if err != nil {
		return err
	}

	err = w.Close()
	if err != nil {
		return err
	}

	return conn.Quit()
}
