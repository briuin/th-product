package routes

import (
	"product-management/controllers"

	"github.com/gin-gonic/gin"
)

func ProductRoutes(r *gin.Engine, productController *controllers.ProductController) {
	productGroup := r.Group("/products")
	{
		productGroup.GET("/", productController.GetAllProducts)
		productGroup.GET("/:id", productController.GetProduct)
	}
}
