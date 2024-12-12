package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"product-management/database"
	"product-management/routes"
)

var db *gorm.DB

func main() {
	// Initialize Gin
	r := gin.Default()

	database.Connect()

	routes.ProductRoutes(r)

	log.Fatal(r.Run(":8080"))
}
