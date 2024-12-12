package routes

import (
	"product-management/controllers"

	"github.com/gin-gonic/gin"
)

func ProductRoutes(router *gin.Engine) {
	productGroup := router.Group("/products")
	{
		productGroup.GET("/", controllers.GetAllProducts)
		productGroup.GET("/:id", controllers.GetProduct)
	}
}
