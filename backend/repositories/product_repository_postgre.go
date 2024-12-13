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

func (t ProductRepositoryPostgre) FindAll(query models.ProductQuery) (products []models.Product, total int64, err error) {
	var count int64
	dbQuery := t.Db.Model(&models.Product{})
	if query.SearchText != "" {
		dbQuery = dbQuery.Where("name LIKE ?", "%"+query.SearchText+"%")
	}
	if err := dbQuery.Count(&count).Error; err != nil {
		return nil, 0, err
	}

	dbQuery = dbQuery.Offset(query.Offset).Limit(query.Limit).Order(query.SortBy + " " + query.SortDirection)
	result := dbQuery.Find(&products)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	return products, count, nil
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
	result := t.Db.Create(&product)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (t ProductRepositoryPostgre) Update(product models.Product) (err error) {
	var existingProduct models.Product
	if err := t.Db.First(&existingProduct, product.ID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("product not found")
		}
		return err
	}

	result := t.Db.Save(&product)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (t ProductRepositoryPostgre) Delete(productId uint) (err error) {
	var product models.Product
	if err := t.Db.First(&product, productId).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("product not found")
		}
		return err
	}

	result := t.Db.Delete(&product)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
