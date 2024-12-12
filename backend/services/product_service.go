package services

import "product-management/models"

type ProductService interface {
	GetProductByID(id uint) (models.Product, error)
	GetAllProducts(name string) ([]models.Product, error)
	CreateProduct(product models.Product) error
	UpdateProduct(product models.Product) error
	DeleteProduct(id uint) error
}
