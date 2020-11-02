package repository

import (
	"context"
	"log"

	"../entity"
	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type RecipeRepository interface {
	Save(recipe *entity.Recipe) (*entity.Recipe, error)
	FindAll() ([]entity.Recipe, error)
}

type repo struct{}

//NewRecipeRepository
func NewRecipeRepository() RecipeRepository {
	return &repo{}
}

const (
	projectId      string = "culina-e7a1d"
	collectionName string = "recipe"
)

func (*repo) Save(recipe *entity.Recipe) (*entity.Recipe, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectId)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	_, _, err = client.Collection(collectionName).Add(ctx, map[string]interface{}{
		"ID":    recipe.ID,
		"Title": recipe.Title,
		"Text":  recipe.Text,
	})

	if err != nil {
		log.Fatalf("Failed adding a new recipe: %v", err)
		return nil, err
	}
	return recipe, nil
}

func (*repo) FindAll() ([]entity.Recipe, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectId)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	var recipes []entity.Recipe
	iter := client.Collection(collectionName).Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}

		if err != nil {
			log.Fatalf("Failed to iterate the list of recipes: %v", err)
			return nil, err
		}
		recipe := entity.Recipe{
			ID:    doc.Data()["ID"].(int64),
			Title: doc.Data()["Title"].(string),
			Text:  doc.Data()["Text"].(string),
		}
		recipes = append(recipes, recipe)
	}
	return recipes, nil
}
