package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"product-management/routes"
)

var db *gorm.DB

func main() {
	// Initialize Gin
	r := gin.Default()

	// Initialize database
	initDB()

	routes.ProductRoutes(r)

	log.Fatal(r.Run(":8080"))
}

func initDB() {
	var err error
	dsn := "host=db user=postgres password=postgres dbname=postgres port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

}
