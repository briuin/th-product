package repositories

import (
	"product-management/models"
)

type ProductRepository interface {
	FindAll(query models.ProductQuery) ([]models.Product, int64, error)
	FindById(productId uint) (product models.Product, err error)
	Create(product models.Product) error
	Update(product models.Product) error
	Delete(productId uint) error
}
