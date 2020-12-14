package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"

	"../entity"
	"../repository"
)

var (
	recipeRepo repository.RecipeRepository = repository.NewRecipeRepository()
)

func GetRecipes(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var category entity.Category
	err := json.NewDecoder(request.Body).Decode(&category)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	recipes, err := recipeRepo.FindAll(category.Category)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error getting the posts"}`))
	}
	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(recipes)
}

//Adds to whole, not being used
func AddRecipe(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var recipe entity.Recipe
	err := json.NewDecoder(request.Body).Decode(&recipe)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the data"}`))
	}

	recipe.ID = rand.Int63()
	recipeRepo.Save(&recipe)

	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(recipe)
}

func GetRecipesForUser(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var user entity.User
	err := json.NewDecoder(request.Body).Decode(&user)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	recipes, err := recipeRepo.FindForUser(user.Email)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error getting the posts"}`))
	}
	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(recipes)
}

func AddRecipeForUser(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var recipe entity.Recipe
	err := json.NewDecoder(request.Body).Decode(&recipe)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	recipe.ID = rand.Int63n(100000)
	recipeRepo.SaveRecipeForUser(&recipe, recipe.Email)

	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(recipe)
}

func UpdateRecipeForUser(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var recipe entity.Recipe
	err := json.NewDecoder(request.Body).Decode(&recipe)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	recipeRepo.UpdateRecipeForUser(&recipe, recipe.Email)

	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(recipe)
}

func DeleteRecipeForUser(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var recipe entity.Recipe
	err := json.NewDecoder(request.Body).Decode(&recipe)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	recipeRepo.DeleteRecipeForUser(&recipe)

	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(recipe)
}
