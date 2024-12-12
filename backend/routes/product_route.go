package routes

import (
	"product-management/controllers"

	"github.com/gin-gonic/gin"
)

func ProductRoutes(r *gin.Engine, productController *controllers.ProductController, uploadController *controllers.UploadController) {
	productGroup := r.Group("/products")
	{
		productGroup.GET("/", productController.GetAllProducts)
		productGroup.GET("/:id", productController.GetProduct)
		productGroup.POST("/", productController.CreateProduct)
		productGroup.PUT("/", productController.UpdateProduct)
	}

	r.POST("/upload", uploadController.UploadImage)
}
