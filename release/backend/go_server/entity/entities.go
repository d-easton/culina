package entity

type Recipe struct {
	ID          int64         `json:"id"`
	Email       string        `json:"email"`
	Image       string        `json:"image"`
	Author      string        `json:"author"`
	Description string        `json:"description"`
	Title       string        `json:"title"`
	Public      bool          `json:"public"`
	Copy        bool          `json:"copy"`
	Likes       int64         `json:"likes"`
	Dislikes    int64         `json:"dislikes"`
	Category    string        `json:"category"`
	Liked       interface{}   `json:"liked"`
	Disliked    interface{}   `json:"disliked"`
	Ingredients []interface{} `json:"ingredients"`
	Steps       []interface{} `json:"steps"`
}

type Commentconnection struct {
	Text     string   `json:"text"`
	Comments []string `json:"comments"`
}

type User struct {
	Email string `json:"email"`
}

type Category struct {
	Category string `json:"category"`
}

type GroceryList struct {
	ID          int64       `json:"id"`
	Email       string      `json:"email"`
	Ingredients interface{} `json:"ingredients"`
}

type MealPlan struct {
	ID        int64         `json:"id"`
	Email     string        `json:"email"`
	Sunday    []interface{} `json:"sunday"`
	Monday    []interface{} `json:"monday"`
	Tuesday   []interface{} `json:"tuesday"`
	Wednesday []interface{} `json:"wednesday"`
	Thursday  []interface{} `json:"thursday"`
	Friday    []interface{} `json:"friday"`
	Saturday  []interface{} `json:"saturday"`
}
