package models

type ProductQuery struct {
	SearchText    string `json:"searchText"`
	Page          int    `json:"page"`
	PerPage       int    `json:"perPage"`
	SortBy        string `json:"sortBy"`
	SortDirection string `json:"sortDirection"`
}
