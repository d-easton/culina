package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"

	"../entity"
	"../repository"
)

var (
	repo repository.RecipeRepository = repository.NewRecipeRepository()
)

func GetRecipes(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	recipes, err := repo.FindAll()
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error getting the posts"}`))
	}
	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(recipes)
}

func AddRecipe(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var recipe entity.Recipe
	err := json.NewDecoder(request.Body).Decode(&recipe)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the data"}`))
	}
	recipe.ID = rand.Int63()
	repo.Save(&recipe)

	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(recipe)
}
