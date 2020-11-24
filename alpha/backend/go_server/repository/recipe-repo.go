package repository

import (
	"context"
	"log"
	"strconv"

	"../entity"
	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type RecipeRepository interface {
	DeleteRecipeForUser(recipe *entity.Recipe) (*entity.Recipe, error)
	UpdateRecipeForUser(recipe *entity.Recipe, user string) (*entity.Recipe, error)
	SaveRecipeForUser(recipe *entity.Recipe, user string) (*entity.Recipe, error)
	FindForUser(user string) ([]entity.Recipe, error)

	FindAll() ([]entity.Recipe, error)
	Save(recipe *entity.Recipe) (*entity.Recipe, error)
}

type recipeRepo struct{}

//NewRecipeRepository
func NewRecipeRepository() RecipeRepository {
	return &recipeRepo{}
}

const (
	projectId        string = "culina-e7a1d"
	recipecollection string = "recipes/users/"
	collectionName   string = "recipe"
)

func (*recipeRepo) DeleteRecipeForUser(recipe *entity.Recipe) (*entity.Recipe, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectId)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	_, err = client.Collection(recipecollection + recipe.Email).Doc(strconv.FormatInt(recipe.ID, 10)).Delete(ctx)
	if err != nil {
		log.Fatalf("Failed deleting a recipe: %v", err)
		return nil, err
	}

	return nil, nil

}

func (*recipeRepo) UpdateRecipeForUser(recipe *entity.Recipe, user string) (*entity.Recipe, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectId)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	_, err = client.Collection(recipecollection+user).Doc(strconv.FormatInt(recipe.ID, 10)).Set(ctx, map[string]interface{}{
		"ID":          recipe.ID,
		"Email":       recipe.Email,
		"Author":      recipe.Author,
		"Title":       recipe.Title,
		"Ingredients": recipe.Ingredients,
		"Steps":       recipe.Steps,
	}, firestore.MergeAll)

	if err != nil {
		log.Fatalf("Failed updating a new recipe: %v", err)
		return nil, err
	}
	return recipe, nil
}

func (*recipeRepo) SaveRecipeForUser(recipe *entity.Recipe, user string) (*entity.Recipe, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectId)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	_, err = client.Collection(recipecollection+user).Doc(strconv.FormatInt(recipe.ID, 10)).Set(ctx, map[string]interface{}{
		"ID":          recipe.ID,
		"Email":       recipe.Email,
		"Author":      recipe.Author,
		"Title":       recipe.Title,
		"Ingredients": recipe.Ingredients,
		"Steps":       recipe.Steps,
	}, firestore.MergeAll)

	if err != nil {
		log.Fatalf("Failed adding a new recipe: %v", err)
		return nil, err
	}
	return recipe, nil
}

func (*recipeRepo) FindForUser(user string) ([]entity.Recipe, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectId)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	var recipes []entity.Recipe
	iter := client.Collection(recipecollection + user).Documents(ctx)
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
			ID:          doc.Data()["ID"].(int64),
			Email:       doc.Data()["Email"].(string),
			Author:      doc.Data()["Author"].(string),
			Title:       doc.Data()["Title"].(string),
			Ingredients: doc.Data()["Ingredients"].(interface{}),
			Steps:       doc.Data()["Steps"].(interface{}),
		}
		recipes = append(recipes, recipe)
	}
	return recipes, nil
}

//Saves to whole, not being used
func (*recipeRepo) Save(recipe *entity.Recipe) (*entity.Recipe, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectId)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	recipe = processNils(recipe)
	defer client.Close()
	_, _, err = client.Collection(collectionName).Add(ctx, map[string]interface{}{
		"ID":          recipe.ID,
		"Email":       recipe.Email,
		"Author":      recipe.Author,
		"Title":       recipe.Title,
		"Ingredients": recipe.Ingredients,
		"Steps":       recipe.Steps,
	})

	if err != nil {
		log.Fatalf("Failed adding a new recipe: %v", err)
		return nil, err
	}
	return recipe, nil
}

func (*recipeRepo) FindAll() ([]entity.Recipe, error) {
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
			ID:          doc.Data()["ID"].(int64),
			Email:       doc.Data()["Email"].(string),
			Author:      doc.Data()["Author"].(string),
			Title:       doc.Data()["Title"].(string),
			Ingredients: doc.Data()["Ingredients"].(interface{}),
			Steps:       doc.Data()["Steps"].(interface{}),
		}
		recipes = append(recipes, recipe)
	}
	return recipes, nil
}

func processNils(recipe *entity.Recipe) *entity.Recipe {
	if recipe.Ingredients == nil {
		recipe.Ingredients = []string{}
	}
	if recipe.Steps == nil {
		recipe.Steps = []string{}
	}
	return recipe
}
