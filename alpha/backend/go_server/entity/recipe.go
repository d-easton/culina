package entity

type Recipe struct {
	ID          int64       `json:"id"`
	Email       string      `json:"email"`
	Author      string      `json:"author"`
	Title       string      `json:"title"`
	Ingredients interface{} `json:"ingredients"`
	Steps       interface{} `json:"steps"`
}

type User struct {
	Email string `json:"email"`
}
