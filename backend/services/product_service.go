package services

import "product-management/models"

type ProductService interface {
	GetProductByID(id uint) (models.Product, error)
	GetAllProducts(query models.ProductQuery) ([]models.Product, int64, error)
	CreateProduct(product models.Product) error
	UpdateProduct(product models.Product) error
	DeleteProduct(id uint) error
}
