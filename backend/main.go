package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"product-management/controllers"
	"product-management/database"
	"product-management/models"
	"product-management/repositories"
	"product-management/routes"
	"product-management/services"
)

var db *gorm.DB

func main() {
	r := gin.Default()

	r.Use(cors.Default())

	uploadDir := "./uploads"
	r.Static("/uploads", uploadDir)

	db = database.Connect()

	err := db.AutoMigrate(&models.Product{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
	log.Println("Database migration successful")

	productRepository := repositories.NewProductRepositoryPostgre(db)
	productService, err := services.NewProductService(productRepository)

	if err != nil {
		log.Fatalf("Error initializing task service: %v", err)
	}

	productController := controllers.NewProductController(productService)
	uploadController := controllers.NewUploadController(uploadDir)
	routes.ProductRoutes(r, productController, uploadController)

	log.Fatal(r.Run(":8080"))
}
