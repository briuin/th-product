package services

import "product-management/models"

type ProductService interface {
	GetProductByID(id uint) (models.Product, error)
	GetAllProducts() ([]models.Product, error)
}
