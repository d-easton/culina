import React from 'react';
class RecipeCard extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.props.recipe);
        this.props.onClick(this.props.recipe);
    }

    render() {
        const ingredientElements = [];
        this.props.recipe.ingredients.forEach((ing, index) => {
            ingredientElements.push(<li className="listElement" key={index}>{ing}</li>);
        });
        const stepElements = [];
        this.props.recipe.steps.forEach((step, index) => {
            stepElements.push(<li className="listElement" key={index}>{step}</li>);
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
            </div>
        );
    }
}

export default RecipeCard;