package repositories

import (
	"product-management/models"

	"gorm.io/gorm"
)

type ProductRepositoryStub struct {
	Db *gorm.DB
}

func NewProductRepositoryStub(Db *gorm.DB) ProductRepository {
	return &ProductRepositoryStub{Db: Db}
}

func (t ProductRepositoryStub) FindAll() (products []models.Product, err error) {
	var result []models.Product = []models.Product{
		{ID: 1, Name: "Laptop", Type: "Electronics", Picture: "laptop.jpg", Price: 999.99, Description: "High-performance laptop"},
		{ID: 2, Name: "Table", Type: "Furniture", Picture: "table.jpg", Price: 199.99, Description: "Wooden dining table"},
	}
	return result, nil
}

func (t ProductRepositoryStub) FindById(productId uint) (task models.Product, err error) {
	var product models.Product = models.Product{ID: 1, Name: "Laptop", Type: "Electronics", Picture: "laptop.jpg", Price: 999.99, Description: "High-performance laptop"}
	return product, nil
}

func (t ProductRepositoryStub) Create(product models.Product) (err error) {
	return nil
}

func (t ProductRepositoryStub) Update(product models.Product) (err error) {
	return nil
}

func (t ProductRepositoryStub) Delete(productId uint) (err error) {
	return nil
}
