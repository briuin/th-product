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
	args := m.Called()
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

func TestGetAllProducts(t *testing.T) {
	mockRepo := new(MockProductRepository)
	service := DefaultProductService{repo: mockRepo}

	// Mock repository behavior
	mockProducts := []models.Product{
		{ID: 1, Name: "Product 1"},
		{ID: 2, Name: "Product 2"},
	}
	mockRepo.On("FindAll").Return(mockProducts, nil)

	// Test service
	products, total, err := service.GetAllProducts(models.ProductQuery{})
	assert.NoError(t, err)
	assert.Equal(t, total, 2)
	assert.Equal(t, 2, len(products))
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
