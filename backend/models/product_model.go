package models

type Product struct {
	ID          uint    `gorm:"primaryKey" json:"id"`
	Name        string  `gorm:"type:varchar(100);not null" json:"name" binding:"required"`
	Type        string  `gorm:"type:varchar(50);not null" json:"type" binding:"required"`
	Picture     string  `gorm:"type:text" json:"picture"`
	Price       float64 `gorm:"not null" json:"price" binding:"required,gt=0"`
	Description string  `gorm:"type:text" json:"description"`
}
