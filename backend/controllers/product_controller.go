package controllers

import (
	"net/http"
	"strconv"

	"product-management/services"

	"github.com/gin-gonic/gin"
)

type ProductController struct {
	productService services.ProductService
}

func NewProductController(service services.ProductService) *ProductController {
	return &ProductController{productService: service}
}

// GetProduct handles GET /products/:id
func (controller *ProductController) GetProduct(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	product, err := controller.productService.GetProductByID(uint(id))

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	c.JSON(http.StatusOK, product)
}

// GetAllProducts handles GET /products
func (controller *ProductController) GetAllProducts(c *gin.Context) {
	products, err := controller.productService.GetAllProducts()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "General Error"})
		return
	}

	c.JSON(http.StatusOK, products)
}
