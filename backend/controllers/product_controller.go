package controllers

import (
	"net/http"
	"strconv"

	"product-management/models"
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
	query := models.ProductQuery{
		SearchText:    c.DefaultQuery("name", ""),
		Offset:        parseQueryParamToInt(c, "page", 0),
		Limit:         parseQueryParamToInt(c, "perPage", 10),
		SortBy:        c.DefaultQuery("sortBy", "name"),
		SortDirection: c.DefaultQuery("sortDirection", "asc"),
	}

	products, total, err := controller.productService.GetAllProducts(query)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Service error: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":   products,
		"total":  total,
		"limit":  query.Limit,
		"offset": query.Offset,
	})
}

func (controller *ProductController) CreateProduct(c *gin.Context) {
	var newProduct models.Product
	if err := c.ShouldBindJSON(&newProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Validation failed: " + err.Error()})
		return
	}
	err := controller.productService.CreateProduct(newProduct)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Service error: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (controller *ProductController) UpdateProduct(c *gin.Context) {
	var updatedProduct models.Product
	if err := c.ShouldBindJSON(&updatedProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Validation failed: " + err.Error()})
		return
	}
	err := controller.productService.UpdateProduct(updatedProduct)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Service error: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, nil)
}

func parseQueryParamToInt(c *gin.Context, param string, defaultValue int) int {
	value, err := strconv.Atoi(c.DefaultQuery(param, strconv.Itoa(defaultValue)))
	if err != nil {
		return defaultValue
	}
	return value
}
