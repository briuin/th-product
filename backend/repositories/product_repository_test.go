package repositories

import (
	"testing"

	"product-management/models"

	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestDB() *gorm.DB {
	db, _ := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	_ = db.AutoMigrate(&models.Product{})
	return db
}

func TestFindAll(t *testing.T) {
	db := setupTestDB()
	repo := NewProductRepositoryPostgre(db)

	// Seed data
	db.Create(&models.Product{Name: "Test Product 1", Price: 100})
	db.Create(&models.Product{Name: "Test Product 2", Price: 200})

	// Explicitly set pagination and sorting
	query := models.ProductQuery{
		Page:          1,
		PerPage:       10,   // Set PerPage explicitly
		SortBy:        "id", // Ensure it matches a valid column
		SortDirection: "asc",
	}

	// Test FindAll
	products, total, err := repo.FindAll(query)

	assert.NoError(t, err)
	assert.Equal(t, int64(2), total)
	assert.Len(t, products, 2)
}

func TestFindById(t *testing.T) {
	db := setupTestDB()
	repo := NewProductRepositoryPostgre(db)

	// Seed data
	db.Create(&models.Product{ID: 1, Name: "Test Product", Price: 100})

	// Test FindById
	product, err := repo.FindById(1)
	assert.NoError(t, err)
	assert.Equal(t, "Test Product", product.Name)
}
