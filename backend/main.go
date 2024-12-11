package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func main() {
	// Initialize Gin
	r := gin.Default()

	// Initialize database
	// initDB()

	log.Fatal(r.Run(":8080"))
}

func initDB() {
	var err error
	dsn := "host=database user=postgres password=123456 dbname=postgres port=5432 sslmode=disable"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

}
