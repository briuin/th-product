package repositories

import (
	"errors"
	"product-management/models"

	"gorm.io/gorm"
)

type ProductRepositoryPostgre struct {
	Db *gorm.DB
}

func NewProductRepositoryPostgre(Db *gorm.DB) ProductRepository {
	return &ProductRepositoryPostgre{Db: Db}
}

func (t ProductRepositoryPostgre) FindAll() (products []models.Product, err error) {
	results := t.Db.Find(&products)
	if results.Error != nil {
		return nil, results.Error
	}

	return products, nil
}

func (t ProductRepositoryPostgre) FindById(productId uint) (product models.Product, err error) {
	result := t.Db.Find(&product, productId)

	if result.Error != nil {
		return models.Product{}, result.Error
	}

	if result.RowsAffected == 0 {
		return models.Product{}, errors.New("Task is not found")
	}

	return product, nil
}

func (t ProductRepositoryPostgre) Create(product models.Product) (err error) {
	return nil
}

func (t ProductRepositoryPostgre) Update(product models.Product) (err error) {
	return nil
}

func (t ProductRepositoryPostgre) Delete(productId uint) (err error) {
	return nil
}
