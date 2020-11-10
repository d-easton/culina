package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	handler "./handlers"
	firebase "firebase.google.com/go"
	"github.com/gorilla/mux"
	"google.golang.org/api/option"
)

func main() {

	opt := option.WithCredentialsFile("./culina-sdk-admin.json")
	_, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("Failed to connect with Firestore with credentials: %v", err)
	}

	router := mux.NewRouter()
	const firePort string = ":8085"
	router.HandleFunc("/", func(response http.ResponseWriter, request *http.Request) {
		fmt.Fprintln(response, "Firestore aspect up and running...")
	})
	router.HandleFunc("/updateRecipe", handler.UpdateRecipeForUser).Methods("PUT")
	router.HandleFunc("/deleteRecipe", handler.DeleteRecipeForUser).Methods("PUT")
	router.HandleFunc("/addRecipeForUser", handler.AddRecipeForUser).Methods("POST")
	router.HandleFunc("/getRecipeForUser", handler.GetRecipesForUser).Methods("POST")

	router.HandleFunc("/getAllRecipe", handler.GetRecipes).Methods("GET")
	router.HandleFunc("/addRecipe", handler.AddRecipe).Methods("POST")
	log.Println("Server listening on port", firePort)
	log.Fatalln(http.ListenAndServe(firePort, router))

}
