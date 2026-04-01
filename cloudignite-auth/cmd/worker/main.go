package main

import (
	"errors"
	"log"
	"math/rand"
	"time"

	"cloudignite-auth/internal/db"
	"cloudignite-auth/internal/repository"
	"cloudignite-auth/internal/storage"

	"github.com/joho/godotenv"
)

const workerConcurrency = 5

func main() {

	_ = godotenv.Load()
	db.Connect()
	db.ConnectAuthDB()
	db.ConnectStorageDB()

	// ✅ VERY IMPORTANT
	storage.InitMinio()

	log.Println("Provisioning worker started...")

	sem := make(chan struct{}, workerConcurrency)

	for {

		jobs, err := repository.FetchProvisioningJobs(10)
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

			sem <- struct{}{}

			go func(j repository.ServiceJob) {

				defer func() { <-sem }()

				log.Println("Provisioning:", j.Type, j.ProjectID)

				if err := provision(j); err != nil {

					if errors.Is(err, ErrAlreadyProcessed) {
						log.Println("Already handled:", j.ID)
						return
					}

					log.Println("Provision failed:", j.ID, err)

					repository.MarkServiceFailed(
						j.ID,
						err.Error(),
					)
				}

			}(job)
		}

		// 🔥 Prevent hot loop
		time.Sleep(time.Millisecond *
			time.Duration(200+rand.Intn(300)))
	}
}
