package controllers

import (
	"net/http"
	"strconv"

	"product-management/services"

	"github.com/gin-gonic/gin"
)

var productService = services.NewProductService()

// GetProduct handles GET /products/:id
func GetProduct(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	product, err := productService.GetProductByID(uint(id))

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	c.JSON(http.StatusOK, product)

	// for _, product := range products {
	// 	if product.ID == uint(id) {
	// 		c.JSON(http.StatusOK, product)
	// 		return
	// 	}
	// }

	//c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
}

// GetAllProducts handles GET /products
func GetAllProducts(c *gin.Context) {
	products, err := productService.GetAllProducts()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "General Error"})
		return
	}

	c.JSON(http.StatusOK, products)
}
