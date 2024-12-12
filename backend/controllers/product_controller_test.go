package controllers

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"

	"product-management/models"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockProductService struct {
	mock.Mock
}

func (m *MockProductService) GetAllProducts(name string) ([]models.Product, error) {
	args := m.Called()
	return args.Get(0).([]models.Product), args.Error(1)
}

func (m *MockProductService) GetProductByID(id uint) (models.Product, error) {
	args := m.Called(id)
	return args.Get(0).(models.Product), args.Error(1)
}

func (m *MockProductService) CreateProduct(product models.Product) error {
	args := m.Called(product)
	return args.Error(0)
}

func (m *MockProductService) UpdateProduct(product models.Product) error {
	args := m.Called(product)
	return args.Error(0)
}

func (m *MockProductService) DeleteProduct(id uint) error {
	args := m.Called(id)
	return args.Error(0)
}

func TestGetProduct_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)
	mockService := new(MockProductService)
	controller := NewProductController(mockService)

	// Mock the service to return a product for the given ID
	expectedProduct := models.Product{
		ID:    1,
		Name:  "Sample Product",
		Price: 100.0,
	}
	mockService.On("GetProductByID", uint(1)).Return(expectedProduct, nil)

	router := gin.Default()
	router.GET("/products/:id", controller.GetProduct)

	// Request with a valid ID
	req, _ := http.NewRequest(http.MethodGet, "/products/1", nil)
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	// Assert the response status code
	assert.Equal(t, http.StatusOK, resp.Code)

	// Assert the response contains the product details
	var responseBody models.Product
	_ = json.Unmarshal(resp.Body.Bytes(), &responseBody)
	assert.Equal(t, expectedProduct, responseBody)
}

func TestGetProduct_InvalidID(t *testing.T) {
	gin.SetMode(gin.TestMode)
	mockService := new(MockProductService)
	controller := NewProductController(mockService)

	router := gin.Default()
	router.GET("/products/:id", controller.GetProduct)

	// Request with an invalid ID
	req, _ := http.NewRequest(http.MethodGet, "/products/invalid-id", nil)
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	// Assert the response status code
	assert.Equal(t, http.StatusBadRequest, resp.Code)

	// Assert the response contains the error message
	var responseBody map[string]string
	_ = json.Unmarshal(resp.Body.Bytes(), &responseBody)
	assert.Equal(t, "Invalid product ID", responseBody["error"])
}

func TestGetProduct_NotFound(t *testing.T) {
	gin.SetMode(gin.TestMode)
	mockService := new(MockProductService)
	controller := NewProductController(mockService)

	// Mock the service to return an error for the given ID
	mockService.On("GetProductByID", uint(1)).Return(models.Product{}, errors.New("Product not found"))

	router := gin.Default()
	router.GET("/products/:id", controller.GetProduct)

	// Request with a valid ID that does not exist
	req, _ := http.NewRequest(http.MethodGet, "/products/1", nil)
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	// Assert the response status code
	assert.Equal(t, http.StatusNotFound, resp.Code)

	// Assert the response contains the error message
	var responseBody map[string]string
	_ = json.Unmarshal(resp.Body.Bytes(), &responseBody)
	assert.Equal(t, "Product not found", responseBody["error"])
}

func TestGetAllProducts(t *testing.T) {
	gin.SetMode(gin.TestMode)
	mockService := new(MockProductService)
	controller := NewProductController(mockService)

	mockProducts := []models.Product{
		{ID: 1, Name: "Product 1"},
		{ID: 2, Name: "Product 2"},
	}
	mockService.On("GetAllProducts").Return(mockProducts, nil)

	router := gin.Default()
	router.GET("/products", controller.GetAllProducts)

	req, _ := http.NewRequest(http.MethodGet, "/products", nil)
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	assert.Equal(t, http.StatusOK, resp.Code)

	var responseProducts []models.Product
	_ = json.Unmarshal(resp.Body.Bytes(), &responseProducts)
	assert.Equal(t, 2, len(responseProducts))
}

func TestGetAllProducts_ServiceError(t *testing.T) {
	gin.SetMode(gin.TestMode)
	mockService := new(MockProductService)
	controller := NewProductController(mockService)

	// Mock the service to return an error
	mockService.On("GetAllProducts").Return([]models.Product{}, errors.New("database error"))

	router := gin.Default()
	router.GET("/products", controller.GetAllProducts)

	// Send the request
	req, _ := http.NewRequest(http.MethodGet, "/products", nil)
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	// Assert the response status code
	assert.Equal(t, http.StatusInternalServerError, resp.Code)

	// Assert the response contains the correct error message
	var responseBody map[string]string
	_ = json.Unmarshal(resp.Body.Bytes(), &responseBody)
	assert.Contains(t, responseBody["error"], "Service error: database error")
}

func TestCreateProduct(t *testing.T) {
	gin.SetMode(gin.TestMode)
	mockService := new(MockProductService)
	controller := NewProductController(mockService)

	newProduct := models.Product{Name: "New Product", Type: "New Type", Price: 200}
	mockService.On("CreateProduct", newProduct).Return(nil)

	router := gin.Default()
	router.POST("/products", controller.CreateProduct)

	body, _ := json.Marshal(newProduct)
	req, _ := http.NewRequest(http.MethodPost, "/products", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	assert.Equal(t, http.StatusOK, resp.Code)
}

func TestCreateProduct_ValidationError(t *testing.T) {
	gin.SetMode(gin.TestMode)
	mockService := new(MockProductService)
	controller := NewProductController(mockService)

	// Missing required fields (e.g., Name)
	invalidProduct := map[string]interface{}{
		"Price": -10.0, // Invalid value for testing
	}

	router := gin.Default()
	router.POST("/products", controller.CreateProduct)

	// Prepare the invalid request
	body, _ := json.Marshal(invalidProduct)
	req, _ := http.NewRequest(http.MethodPost, "/products", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	// Assert the response status code and message
	assert.Equal(t, http.StatusBadRequest, resp.Code)

	var responseBody map[string]string
	_ = json.Unmarshal(resp.Body.Bytes(), &responseBody)
	assert.Contains(t, responseBody["error"], "Validation failed")
}

func TestCreateProduct_ServiceError(t *testing.T) {
	gin.SetMode(gin.TestMode)
	mockService := new(MockProductService)
	controller := NewProductController(mockService)

	// Valid product data
	newProduct := models.Product{
		Name:  "Valid Product",
		Type:  "Valid Type",
		Price: 100.0,
	}

	// Mock the service to return an error
	mockService.On("CreateProduct", newProduct).Return(errors.New("database error"))

	// Set up the router and handler
	router := gin.Default()
	router.POST("/products", controller.CreateProduct)

	// Prepare the request
	body, _ := json.Marshal(newProduct)
	req, _ := http.NewRequest(http.MethodPost, "/products", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	// Assert the response status code
	assert.Equal(t, http.StatusInternalServerError, resp.Code)

	// Assert the response contains the correct error message
	var responseBody map[string]string
	_ = json.Unmarshal(resp.Body.Bytes(), &responseBody)
	assert.Contains(t, responseBody["error"], "Service error: database error")
}

func TestUpdateProduct_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)
	mockService := new(MockProductService)
	controller := NewProductController(mockService)

	// Valid product data
	updatedProduct := models.Product{
		ID:    1,
		Name:  "Updated Product",
		Price: 100.0,
		Type:  "Updated Type",
	}

	// Mock the service to succeed
	mockService.On("UpdateProduct", updatedProduct).Return(nil)

	router := gin.Default()
	router.PUT("/products", controller.UpdateProduct)

	// Prepare the valid request
	body, _ := json.Marshal(updatedProduct)
	req, _ := http.NewRequest(http.MethodPut, "/products", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	// Assert the response status code
	assert.Equal(t, http.StatusOK, resp.Code)

	// Assert the response body is empty (nil)
	assert.Equal(t, "null", resp.Body.String())
}

func TestUpdateProduct_ValidationError(t *testing.T) {
	gin.SetMode(gin.TestMode)
	mockService := new(MockProductService)
	controller := NewProductController(mockService)

	// Invalid input data (missing required fields)
	invalidProduct := map[string]interface{}{
		"Price": -10.0, // Invalid price
	}

	router := gin.Default()
	router.PUT("/products", controller.UpdateProduct)

	// Prepare the invalid request
	body, _ := json.Marshal(invalidProduct)
	req, _ := http.NewRequest(http.MethodPut, "/products", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	// Assert the response status code
	assert.Equal(t, http.StatusBadRequest, resp.Code)

	// Assert the response contains the validation error
	var responseBody map[string]string
	_ = json.Unmarshal(resp.Body.Bytes(), &responseBody)
	assert.Contains(t, responseBody["error"], "Validation failed")
}

func TestUpdateProduct_ServiceError(t *testing.T) {
	gin.SetMode(gin.TestMode)
	mockService := new(MockProductService)
	controller := NewProductController(mockService)

	// Valid product data
	updatedProduct := models.Product{
		ID:    1,
		Name:  "Updated Product",
		Price: 100.0,
		Type:  "Updated Type",
	}

	// Mock the service to return an error
	mockService.On("UpdateProduct", updatedProduct).Return(errors.New("database error"))

	router := gin.Default()
	router.PUT("/products", controller.UpdateProduct)

	// Prepare the valid request
	body, _ := json.Marshal(updatedProduct)
	req, _ := http.NewRequest(http.MethodPut, "/products", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	// Assert the response status code
	assert.Equal(t, http.StatusInternalServerError, resp.Code)

	// Assert the response contains the correct error message
	var responseBody map[string]string
	_ = json.Unmarshal(resp.Body.Bytes(), &responseBody)
	assert.Contains(t, responseBody["error"], "Service error: database error")
}
