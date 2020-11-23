package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"

	"../entity"
	"../repository"
)

var (
	groceryRepo repository.GroceryRepository = repository.NewGroceryRepository()
)

func AddItemToList(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var groceryList entity.GroceryList
	err := json.NewDecoder(request.Body).Decode(&groceryList)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	groceryList.ID = rand.Int63n(100000)
	groceryRepo.SaveGroceryForUser(&groceryList, groceryList.Email)

	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(groceryList)
}

func UpdateGroceryList(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var groceryList entity.GroceryList
	err := json.NewDecoder(request.Body).Decode(&groceryList)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	groceryRepo.UpdateGroceryListForUser(&groceryList, groceryList.Email)

	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(groceryList)
}

func GetGroceryList(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var user entity.User
	err := json.NewDecoder(request.Body).Decode(&user)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	grocerList, err := groceryRepo.FindForUser(user.Email)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error getting the posts"}`))
	}
	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(grocerList)
}
