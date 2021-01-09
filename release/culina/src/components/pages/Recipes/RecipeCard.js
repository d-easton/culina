import React from "react";
import blankImage from "./css/images/question_mark.png"

const axios = require("axios");
const updateGroceryListURL =
    "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/updateGroceryList";
const getGroceryListURL =
    "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getGroceryList";

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: props.email,
        };

        this.handleClick = this.handleClick.bind(this);
        this.sendToGroceryList = this.sendToGroceryList.bind(this);
    }

    //FUNCTION TO ADD TO GROCERY LIST
    sendToGroceryList(e) {
        e.stopPropagation();
        let payload = [];
        let ingredients = [];
        //pushes ingredients from specified recipe card to payload array
        this.props.recipe.ingredients.forEach((element) => {
            payload.push(element.text);
        });
        //Gets current grocery list from db, pushes onto ingredients array
        const getL = {
            email: this.state.email,
        };
        axios
            .post(getGroceryListURL, getL)
            .then((response) => {
                response.data[0].ingredients.forEach((element) => {
                    ingredients.push(element);
                });
                //Once current list is received, push new ingredients from recipe card
                //onto ingredients array
                payload.forEach((element) => {
                    ingredients.push(element);
                });

                //update grocery list with new ingredients array
                const savedList = {
                    id: 0,
                    email: this.state.email,
                    ingredients: ingredients,
                };
                this.setState({ isDisabled: true });
                axios
                    .put(updateGroceryListURL, savedList)
                    .catch((err) => console.log("err", err));
            })
            .catch((err) => {
                payload.forEach((element) => {
                    ingredients.push(element);
                });
                const savedList = {
                    id: 0,
                    email: this.state.email,
                    ingredients: ingredients,
                };
                axios
                    .put(updateGroceryListURL, savedList)
                    .catch((err) => console.log("err", err));
            });
    }

    handleClick() {
        this.props.onClick(this.props.recipe);
    }

  render() {
    const ingredientElements = [];
    this.props.recipe.ingredients.forEach((ing, index) => {
      console.log(ing);
      ingredientElements.push(
        <li className="listElement" key={index}>
          {ing.text}
        </li>
      );
    });
    const stepElements = [];
    this.props.recipe.steps.forEach((step, index) => {
      stepElements.push(
        <li className="listElement" key={index}>
          {step.text}
        </li>
      );
    });
      if (this.props.recipe.image != "") {
        return (
          <div className={this.props.isHidden ? "newRecipeCard hidden" : "newRecipeCard"} onClick={this.handleClick}>
            <div className="recipeCardBody">
              <img className="recipeCardBodyImage" src={this.props.recipe.image}/>
              <div className="recipeCardBodyCategory">{this.props.recipe.category}</div>
            </div>
            <div className="recipeCardFooter">
              <h5>{this.props.recipe.title}</h5>
            </div>
          </div>
        );
      }
     //Recipe without image
     return (
          <div className={this.props.isHidden ? "newRecipeCard hidden" : "newRecipeCard"} onClick={this.handleClick}>
            <div className="recipeCardBody">
              <img className="recipeCardBodyImage" src={blankImage}/>
              <div className="recipeCardBodyCategory">{this.props.recipe.category}</div>
            </div>
            <div className="recipeCardFooter">
              <h5>{this.props.recipe.title}</h5>
            </div>
          </div>
       /*
          <div className={this.props.isHidden ? "newRecipeCard hidden" : "newRecipeCard"} onClick={this.handleClick}>
            <div className="recipeCardBody">
              <div className="recipeCardBodyInfo">
                <h6>Ingredients</h6>
                <ul className="recipeList">{ingredientElements}</ul>
                <h6>Steps</h6>
                <ol className="recipeList">{stepElements}</ol> 
                </div>
              <div className="recipeCardBodyCategory">{this.props.recipe.category}</div>
            </div>
            <div className="recipeCardFooter">
              <h5>{this.props.recipe.title}</h5>
            </div>
          </div>
          */
     );
        /*
          return (
              <div className="recipeCard" onClick={this.handleClick}>
                  <div className="recipeHeader">
                      <h1>{this.props.recipe.title}</h1>
                      <h2>By: {this.props.recipe.author} </h2>
                      <hr />
                  </div>
                  <div className="recipeBody disabled" >
                          <img className="recipeBodyImage" src={this.props.recipe.image} />

                  </div>
                  <div className="recipeBodyFooter">
                      <p>Category: {this.props.recipe.category}</p>
                  </div>
                  <button onClick={this.sendToGroceryList}>Add to Grocery List</button>
              </div>
          );
          */
      /*
    return (
      <div className="recipeCard" onClick={this.handleClick}>
        <div className="recipeHeader">
          <h1>{this.props.recipe.title}</h1>
          <h2>By: {this.props.recipe.author} </h2>
          <hr />
        </div>
        <div
          className={
            this.props.modalEnabled ? "recipeBody disabled" : "recipeBody"
          }
        >
          <div className="recipeInnerBody">
            <div className="recipeDescription">
              <p>{this.props.recipe.description} </p>
            </div>
            <h3>Ingredients</h3>
            <ul className="recipeList">{ingredientElements}</ul>
            <h3>Steps</h3>
            <ol className="recipeList">{stepElements}</ol>
          </div>
         
        </div>
            <div className="recipeBodyFooter">
                <p>Category: {this.props.recipe.category}</p>
            </div>
        <button onClick={this.sendToGroceryList}>Add to Grocery List</button>
      </div>
    );
    */
   //Recipe with image
    
  }
}

export default RecipeCard;
