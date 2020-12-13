import React from 'react';
class RecipeCard extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.sendToGroceryList = this.sendToGroceryList.bind(this);
    }

    //EMILY: FUNCTION TO ADD TO GROCERY LIST
    sendToGroceryList(e) {
        e.stopPropagation();
        let ingredients = []
        this.props.recipe.ingredients.forEach((element) => {
            ingredients.push(element.text);
        })
        console.log(ingredients);
    }
    handleClick() {
        console.log("handling click")
        this.props.onClick(this.props.recipe);
    }

 

    render() {
        const ingredientElements = [];
        this.props.recipe.ingredients.forEach((ing, index) => {
            ingredientElements.push(<li className="listElement" key={index}>{ing.text}</li>);
        });
        const stepElements = [];
        this.props.recipe.steps.forEach((step, index) => {
            stepElements.push(<li className="listElement" key={index}>{step.text}</li>);
        });
        return (

            <div className="recipeCard" onClick={this.handleClick}>
                <div className="recipeHeader">
                    <h1>{this.props.recipe.title}</h1>
                    <h2>By: {this.props.recipe.author} </h2>
                    <hr />
                </div>
                <div className={this.props.modalEnabled ? "recipeBody disabled" : "recipeBody"}>
                    <div className="recipeInnerBody">
                        <h3>Ingredients</h3>
                        <ul className="recipeList">
                            {ingredientElements}
                        </ul>
                        <h3>Steps</h3>
                        <ol className="recipeList">
                            {stepElements}
                        </ol>
                    </div>
                </div>
                <button onClick={this.sendToGroceryList}>Add to Grocery List</button>
            </div>
        );
    }
}

export default RecipeCard;