package services

import (
	"errors"
	"testing"

	"product-management/models"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockProductRepository struct {
	mock.Mock
}

func (m *MockProductRepository) FindAll(query models.ProductQuery) ([]models.Product, int64, error) {
	args := m.Called(query)
	return args.Get(0).([]models.Product), int64(args.Int(1)), args.Error(2)
}

func (m *MockProductRepository) FindById(id uint) (models.Product, error) {
	args := m.Called(id)
	return args.Get(0).(models.Product), args.Error(1)
}

func (m *MockProductRepository) Create(product models.Product) error {
	args := m.Called(product)
	return args.Error(0)
}

func (m *MockProductRepository) Update(product models.Product) error {
	args := m.Called(product)
	return args.Error(0)
}

func (m *MockProductRepository) Delete(id uint) error {
	args := m.Called(id)
	return args.Error(0)
}

func TestGetProductByID_Success(t *testing.T) {
	mockRepo := new(MockProductRepository)
	service := DefaultProductService{repo: mockRepo}

	// Mock repository behavior
	mockProduct := models.Product{ID: 1, Name: "Product 1"}
	mockRepo.On("FindById", uint(1)).Return(mockProduct, nil)

	// Test service
	product, err := service.GetProductByID(1)
	assert.NoError(t, err)
	assert.Equal(t, mockProduct, product)
}

func TestGetProductByID_NotFound(t *testing.T) {
	mockRepo := new(MockProductRepository)
	service := DefaultProductService{repo: mockRepo}

	// Mock repository behavior
	mockRepo.On("FindById", uint(1)).Return(models.Product{}, errors.New("Product not found"))

	// Test service
	_, err := service.GetProductByID(1)
	assert.Error(t, err)
	assert.Equal(t, "Product not found", err.Error())
}

func TestCreateProduct(t *testing.T) {
	mockRepo := new(MockProductRepository)
	service := DefaultProductService{repo: mockRepo}

	// Mock repository behavior
	product := models.Product{Name: "New Product"}
	mockRepo.On("Create", product).Return(nil)

	// Test service
	err := service.CreateProduct(product)
	assert.NoError(t, err)
}

func TestUpdateProduct(t *testing.T) {
	mockRepo := new(MockProductRepository)
	service := DefaultProductService{repo: mockRepo}

	// Mock repository behavior
	product := models.Product{ID: 1, Name: "Updated Product"}
	mockRepo.On("Update", product).Return(nil)

	// Test service
	err := service.UpdateProduct(product)
	assert.NoError(t, err)
}

func TestDeleteProduct(t *testing.T) {
	mockRepo := new(MockProductRepository)
	service := DefaultProductService{repo: mockRepo}

	// Mock repository behavior
	mockRepo.On("Delete", uint(1)).Return(nil)

	// Test service
	err := service.DeleteProduct(1)
	assert.NoError(t, err)
}
