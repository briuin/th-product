package services

import (
	"product-management/models"
)

type ProductService struct{}

func NewProductService() *ProductService {
	return &ProductService{}
}

func (s *ProductService) GetProductByID(id uint) (*models.Product, error) {
	var product models.Product
	// if err := database.DB.First(&product, id).Error; err != nil {
	// 	return nil, err
	// }

	product = models.Product{ID: 1, Name: "Laptop", Type: "Electronics", Picture: "laptop.jpg", Price: 999.99, Description: "High-performance laptop"}
	return &product, nil
}

func (s *ProductService) GetAllProducts() ([]models.Product, error) {
	var products []models.Product
	// if err := database.DB.Find(&products).Error; err != nil {
	// 	return nil, err
	// }

	products = []models.Product{
		{ID: 1, Name: "Laptop", Type: "Electronics", Picture: "laptop.jpg", Price: 999.99, Description: "High-performance laptop"},
		{ID: 2, Name: "Table", Type: "Furniture", Picture: "table.jpg", Price: 199.99, Description: "Wooden dining table"},
	}
	return products, nil
}
