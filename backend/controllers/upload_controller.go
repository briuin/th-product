package controllers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

type UploadController struct {
	UploadDir string
}

func NewUploadController(uploadDir string) *UploadController {
	return &UploadController{
		UploadDir: uploadDir,
	}
}

// UploadImage handles the image upload
func (uc *UploadController) UploadImage(c *gin.Context) {
	// Get the uploaded file
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file is uploaded"})
		return
	}

	// Ensure the uploaded file is an image (basic check)
	allowedExtensions := []string{".jpg", ".jpeg", ".png", ".gif"}
	ext := filepath.Ext(file.Filename)
	isAllowed := false
	for _, allowedExt := range allowedExtensions {
		if ext == allowedExt {
			isAllowed = true
			break
		}
	}
	if !isAllowed {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file type. Only images are allowed"})
		return
	}

	// Generate a unique filename
	timestamp := time.Now().Unix()
	filename := fmt.Sprintf("%d%s", timestamp, ext)
	filePath := filepath.Join(uc.UploadDir, filename)

	// Save the file to the upload directory
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to save the file"})
		return
	}

	// Return the file URL
	fileURL := fmt.Sprintf("/uploads/%s", filename)
	c.JSON(http.StatusOK, gin.H{
		"message": "File uploaded successfully",
		"url":     fileURL,
	})
}
