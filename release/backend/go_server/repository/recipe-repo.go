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
	FindAll(category string) ([]entity.Recipe, error)

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
	recipeName       string = "recipes"
	document         string = "users"

	collectionName string = "recipe"
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
		"Image":       recipe.Image,
		"Description": recipe.Description,
		"Author":      recipe.Author,
		"Title":       recipe.Title,
		"Copy":        recipe.Copy,
		"Public":      recipe.Public,
		"Likes":       recipe.Likes,
		"Dislikes":    recipe.Dislikes,
		"Category":    recipe.Category,
		"Liked":       recipe.Liked,
		"Disliked":    recipe.Disliked,
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
		"Image":       recipe.Image,
		"Description": recipe.Description,
		"Author":      recipe.Author,
		"Title":       recipe.Title,
		"Copy":        recipe.Copy,
		"Public":      recipe.Public,
		"Likes":       recipe.Likes,
		"Dislikes":    recipe.Dislikes,
		"Category":    recipe.Category,
		"Liked":       recipe.Liked,
		"Disliked":    recipe.Disliked,
		"Ingredients": recipe.Ingredients,
		"Steps":       recipe.Steps,
	}, firestore.MergeAll)

	if err != nil {
		log.Fatalf("Failed adding a new recipe: %#v", err)
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
			Image:       doc.Data()["Image"].(string),
			Description: doc.Data()["Description"].(string),
			Author:      doc.Data()["Author"].(string),
			Title:       doc.Data()["Title"].(string),
			Copy:		 doc.Data()["Copy"].(bool),
			Public:      doc.Data()["Public"].(bool),
			Likes:       doc.Data()["Likes"].(int64),
			Dislikes:    doc.Data()["Dislikes"].(int64),
			Category:    doc.Data()["Category"].(string),
			Liked:       doc.Data()["Liked"].(interface{}),
			Disliked:    doc.Data()["Disliked"].(interface{}),
			Ingredients: doc.Data()["Ingredients"].([]interface{}),
			Steps:       doc.Data()["Steps"].([]interface{}),
		}
		recipes = append(recipes, recipe)
	}
	return recipes, nil
}

func (*recipeRepo) FindAll(category string) ([]entity.Recipe, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectId)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	var recipes []entity.Recipe
	iter := client.Collection(recipeName).Doc(document).Collections(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		info := doc.Documents(ctx)
		for {
			innerDoc, err := info.Next()
			if err == iterator.Done {
				break
			}
			if err != nil {
				log.Fatalf("Failed to iterate the list of recipes: %v", err)
				return nil, err
			}
			recipe := entity.Recipe{
				ID:          innerDoc.Data()["ID"].(int64),
				Email:       innerDoc.Data()["Email"].(string),
				Image:       innerDoc.Data()["Image"].(string),
				Description: innerDoc.Data()["Description"].(string),
				Author:      innerDoc.Data()["Author"].(string),
				Title:       innerDoc.Data()["Title"].(string),
				Copy:		 innerDoc.Data()["Copy"].(bool),
				Public:      innerDoc.Data()["Public"].(bool),
				Likes:       innerDoc.Data()["Likes"].(int64),
				Dislikes:    innerDoc.Data()["Dislikes"].(int64),
				Category:    innerDoc.Data()["Category"].(string),
				Liked:       innerDoc.Data()["Liked"].(interface{}),
				Disliked:    innerDoc.Data()["Disliked"].(interface{}),
				Ingredients: innerDoc.Data()["Ingredients"].([]interface{}),
				Steps:       innerDoc.Data()["Steps"].([]interface{}),
			}
			if recipe.Category == category {
				recipes = append(recipes, recipe)
			}
		}
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

	// recipe = processNils(recipe)
	defer client.Close()
	_, _, err = client.Collection(collectionName).Add(ctx, map[string]interface{}{
		"ID":          recipe.ID,
		"Email":       recipe.Email,
		"Image":       recipe.Image,
		"Description": recipe.Description,
		"Author":      recipe.Author,
		"Title":       recipe.Title,
		"Copy":        recipe.Copy,
		"Public":      recipe.Public,
		"Likes":       recipe.Likes,
		"Dislikes":    recipe.Dislikes,
		"Category":    recipe.Category,
		"Liked":       recipe.Liked,
		"Disliked":    recipe.Disliked,
		"Ingredients": recipe.Ingredients,
		"Steps":       recipe.Steps,
	})

	if err != nil {
		log.Fatalf("Failed adding a new recipe: %v", err)
		return nil, err
	}
	return recipe, nil
}

// func processNils(recipe *entity.Recipe) *entity.Recipe {
// 	if recipe.Ingredients == nil {
// 		recipe.Ingredients = []string{}
// 	}
// 	if recipe.Steps == nil {
// 		recipe.Steps = []string{}
// 	}
// 	return recipe
// }
