package services

import (
	"product-management/models"
	"product-management/repositories"
)

type DefaultProductService struct {
	repo repositories.ProductRepository
}

func NewProductService(repo repositories.ProductRepository) (service ProductService, err error) {
	return &DefaultProductService{repo: repo}, nil
}

func (s *DefaultProductService) GetProductByID(id uint) (models.Product, error) {
	return s.repo.FindById(id)
}

func (s *DefaultProductService) GetAllProducts(query models.ProductQuery) (products []models.Product, total int64, err error) {
	return s.repo.FindAll(query)
}

func (s *DefaultProductService) CreateProduct(product models.Product) error {
	return s.repo.Create(product)
}

func (s *DefaultProductService) UpdateProduct(product models.Product) error {
	return s.repo.Update(product)
}

func (s *DefaultProductService) DeleteProduct(id uint) error {
	return s.repo.Delete(id)
}
