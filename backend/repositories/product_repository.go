package repositories

import (
	"product-management/models"
)

type ProductRepository interface {
	FindAll() ([]models.Product, error)
	FindById(productId uint) (task models.Product, err error)
}
