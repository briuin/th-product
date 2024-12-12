package repositories

import (
	"product-management/models"
)

type ProductRepository interface {
	FindAll(name string) ([]models.Product, error)
	FindById(productId uint) (product models.Product, err error)
	Create(product models.Product) error
	Update(product models.Product) error
	Delete(productId uint) error
}
