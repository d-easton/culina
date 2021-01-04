package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"

	"../entity"
	"../repository"
)

var (
	mealPlanRepo repository.MealPlanRepository = repository.NewMealPlanRepository()
)

func GetMealPlan(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var user entity.User
	err := json.NewDecoder(request.Body).Decode(&user)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	recipes, err := mealPlanRepo.FindMealPlanForUser(user.Email)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error getting the posts"}`))
	}
	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(recipes)
}

func AddMealPlan(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var mealPlan entity.MealPlan
	err := json.NewDecoder(request.Body).Decode(&mealPlan)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	mealPlan.ID = rand.Int63n(100000)
	mealPlanRepo.SaveMealPlanForUser(&mealPlan, mealPlan.Email)

	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(mealPlan)
}

func UpdateMealPlan(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Access-Control-Allow-Origin", "*")
	response.Header().Set("Content-Type", "application/json")
	var mealPlan entity.MealPlan
	err := json.NewDecoder(request.Body).Decode(&mealPlan)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	mealPlanRepo.UpdateMealPlanForUser(&mealPlan, mealPlan.Email)

	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(mealPlan)
}

func DeleteMealPlan(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var mealPlan entity.MealPlan
	err := json.NewDecoder(request.Body).Decode(&mealPlan)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"error": "Error unmarshalling the recipe data"}`))
	}

	mealPlanRepo.DeleteMealPlanForUser(&mealPlan)

	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(mealPlan)
}
