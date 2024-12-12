package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Product struct {
	ID          int     `json:"id"`
	Name        string  `json:"name" binding:"required"`
	Type        string  `json:"type" binding:"required"`
	Picture     string  `json:"picture"`
	Price       float64 `json:"price" binding:"required,gt=0"`
	Description string  `json:"description"`
}

// Mock data store (replace with a database in real use)
var products = []Product{
	{ID: 1, Name: "Laptop", Type: "Electronics", Picture: "laptop.jpg", Price: 999.99, Description: "High-performance laptop"},
	{ID: 2, Name: "Table", Type: "Furniture", Picture: "table.jpg", Price: 199.99, Description: "Wooden dining table"},
}

// GetProduct handles GET /products/:id
func GetProduct(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	for _, product := range products {
		if product.ID == id {
			c.JSON(http.StatusOK, product)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
}

// GetAllProducts handles GET /products
func GetAllProducts(c *gin.Context) {
	c.JSON(http.StatusOK, products)
}
