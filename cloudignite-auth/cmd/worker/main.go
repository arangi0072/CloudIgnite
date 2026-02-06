package main

import (
	"log"
	"time"

	"cloudignite-auth/internal/db"
	"cloudignite-auth/internal/repository"

	"github.com/joho/godotenv"
)

func main() {

	godotenv.Load()

	db.Connect()

	log.Println("Provisioning worker started...")

	for {

		jobs, err := repository.FetchProvisioningJobs(5)
		if err != nil {
			log.Println("job fetch error:", err)
			time.Sleep(3 * time.Second)
			continue
		}

		if len(jobs) == 0 {
			time.Sleep(2 * time.Second)
			continue
		}

		for _, job := range jobs {

			log.Println("Provisioning:", job.Type, job.ProjectID)

			err := provision(job)

			if err != nil {
				repository.MarkServiceFailed(job.ID, err.Error())
				continue
			}

			repository.MarkServiceActive(job.ID)
		}
	}
}
