package repository

import (
	"context"
	"log"
	"strconv"

	"../entity"
	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type MealPlanRepository interface {
	DeleteMealPlanForUser(MealPlan *entity.MealPlan) (*entity.MealPlan, error)
	UpdateMealPlanForUser(MealPlan *entity.MealPlan, user string) (*entity.MealPlan, error)
	SaveMealPlanForUser(MealPlan *entity.MealPlan, user string) (*entity.MealPlan, error)
	FindMealPlanForUser(user string) ([]entity.MealPlan, error)
}

type mealPlanRepo struct{}

//NewMealPlanRepository
func NewMealPlanRepository() MealPlanRepository {
	return &mealPlanRepo{}
}

const (
	ProjectID          string = "culina-e7a1d"
	mealPlanCollection string = "mealPlans/users/"
)

func (*mealPlanRepo) DeleteMealPlanForUser(mealPlan *entity.MealPlan) (*entity.MealPlan, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, ProjectID)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	_, err = client.Collection(mealPlanCollection + mealPlan.Email).Doc(strconv.FormatInt(mealPlan.ID, 10)).Delete(ctx)
	if err != nil {
		log.Fatalf("Failed deleting a recipe: %v", err)
		return nil, err
	}

	return nil, nil

}

func (*mealPlanRepo) UpdateMealPlanForUser(mealPlan *entity.MealPlan, user string) (*entity.MealPlan, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, ProjectID)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	_, err = client.Collection(mealPlanCollection+user).Doc(strconv.FormatInt(mealPlan.ID, 10)).Set(ctx, map[string]interface{}{
		"ID":        mealPlan.ID,
		"Email":     mealPlan.Email,
		"Sunday":    mealPlan.Sunday,
		"Monday":    mealPlan.Monday,
		"Tuesday":   mealPlan.Tuesday,
		"Wednesday": mealPlan.Wednesday,
		"Thursday":  mealPlan.Thursday,
		"Friday":    mealPlan.Friday,
		"Saturday":  mealPlan.Saturday,
	}, firestore.MergeAll)

	if err != nil {
		log.Fatalf("Failed updating a new recipe: %v", err)
		return nil, err
	}
	return mealPlan, nil
}

func (*mealPlanRepo) SaveMealPlanForUser(mealPlan *entity.MealPlan, user string) (*entity.MealPlan, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, ProjectID)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	_, err = client.Collection(mealPlanCollection+user).Doc(strconv.FormatInt(mealPlan.ID, 10)).Set(ctx, map[string]interface{}{
		"ID":        mealPlan.ID,
		"Email":     mealPlan.Email,
		"Sunday":    mealPlan.Sunday,
		"Monday":    mealPlan.Monday,
		"Tuesday":   mealPlan.Tuesday,
		"Wednesday": mealPlan.Wednesday,
		"Thursday":  mealPlan.Thursday,
		"Friday":    mealPlan.Friday,
		"Saturday":  mealPlan.Saturday,
	}, firestore.MergeAll)

	if err != nil {
		log.Fatalf("Failed adding a new recipe: %#v", err)
		return nil, err
	}
	return mealPlan, nil
}

func (*mealPlanRepo) FindMealPlanForUser(user string) ([]entity.MealPlan, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, ProjectID)
	if err != nil {
		log.Fatalf("Failed to create a Firestore Client: %v", err)
		return nil, err
	}

	defer client.Close()
	var mealPlans []entity.MealPlan
	iter := client.Collection(mealPlanCollection + user).Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}

		if err != nil {
			log.Fatalf("Failed to iterate the list of recipes: %v", err)
			return nil, err
		}
		meals := entity.MealPlan{
			ID:        doc.Data()["ID"].(int64),
			Email:     doc.Data()["Email"].(string),
			Sunday:    doc.Data()["Sunday"].([]interface{}),
			Monday:    doc.Data()["Monday"].([]interface{}),
			Tuesday:   doc.Data()["Tuesday"].([]interface{}),
			Wednesday: doc.Data()["Wednesday"].([]interface{}),
			Thursday:  doc.Data()["Thursday"].([]interface{}),
			Friday:    doc.Data()["Friday"].([]interface{}),
			Saturday:  doc.Data()["Saturday"].([]interface{}),
		}
		mealPlans = append(mealPlans, meals)
	}
	return mealPlans, nil
}
