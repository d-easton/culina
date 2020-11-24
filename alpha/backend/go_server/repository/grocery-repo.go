package repository

import (
	"context"
	"log"
	"strconv"

	"../entity"
	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type GroceryRepository interface {
	UpdateGroceryListForUser(recipe *entity.GroceryList, user string) (*entity.GroceryList, error)
	SaveGroceryForUser(recipe *entity.GroceryList, user string) (*entity.GroceryList, error)
	FindForUser(user string) ([]entity.GroceryList, error)
}

type groceryRepo struct{}

//NewRecipeRepository
func NewGroceryRepository() GroceryRepository {
	return &groceryRepo{}
}

const (
	projectID         string = "culina-e7a1d"
	grocerycollection string = "groceryList/users/"
)

func (*groceryRepo) UpdateGroceryListForUser(groceryList *entity.GroceryList, user string) (*entity.GroceryList, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	_, err = client.Collection(grocerycollection+user).Doc(strconv.FormatInt(groceryList.ID, 10)).Set(ctx, map[string]interface{}{
		"ID":          groceryList.ID,
		"Email":       groceryList.Email,
		"Ingredients": groceryList.Ingredients,
	}, firestore.MergeAll)

	if err != nil {
		log.Fatalf("Failed updating a new recipe: %v", err)
		return nil, err
	}
	return groceryList, nil
}

func (*groceryRepo) SaveGroceryForUser(groceryList *entity.GroceryList, user string) (*entity.GroceryList, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	_, err = client.Collection(grocerycollection+user).Doc(strconv.FormatInt(groceryList.ID, 10)).Set(ctx, map[string]interface{}{
		"ID":          groceryList.ID,
		"Email":       groceryList.Email,
		"Ingredients": groceryList.Ingredients,
	}, firestore.MergeAll)

	if err != nil {
		log.Fatalf("Failed adding a new recipe: %v", err)
		return nil, err
	}
	return groceryList, nil
}

func (*groceryRepo) FindForUser(user string) ([]entity.GroceryList, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	var GroceryList []entity.GroceryList

	iter := client.Collection(grocerycollection + user).Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatalf("Failed to iterate the list of recipes: %v", err)
			return nil, err
		}
		groceryList := entity.GroceryList{
			ID:          doc.Data()["ID"].(int64),
			Email:       doc.Data()["Email"].(string),
			Ingredients: doc.Data()["Ingredients"].(interface{}),
		}
		GroceryList = append(GroceryList, groceryList)
	}
	return GroceryList, nil
}
