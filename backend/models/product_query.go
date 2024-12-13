package models

type ProductQuery struct {
	SearchText    string `json:"searchText"`
	Offset        int    `json:"offset"`
	Limit         int    `json:"limit"`
	SortBy        string `json:"sortBy"`
	SortDirection string `json:"sortDirection"`
}
