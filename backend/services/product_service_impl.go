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

func (s *DefaultProductService) GetAllProducts() ([]models.Product, error) {
	return s.repo.FindAll()
}
