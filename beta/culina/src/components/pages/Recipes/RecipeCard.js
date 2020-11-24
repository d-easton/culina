import React from 'react';

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.recipe);
    }

    render() {
        const ingredientElements = this.props.recipe.ingredients.map(ing =>
            <li className="listElement" key={ing}>{ing}</li>
        );
        const stepElements = this.props.recipe.steps.map(step => <li className="listElement" key={step}>{step}</li>)
        return (

            <div className="recipeCard" onClick={this.handleClick}>
                <div className="recipeHeader">
                    <h1>{this.props.recipe.title}</h1>
                    <h2>By: {this.props.recipe.author} </h2>
                </div>
                <div className="recipeBody">
                    <h3 className="listTitle">Ingredients</h3>
                    <ul className="recipeList">
                        {ingredientElements}
                    </ul>
                    <h3 className="listTitle">Steps</h3>
                    <ol className="recipeList">
                        {stepElements}
                    </ol>
                </div>
                <div className="fadeout"></div>
            </div>
        );
    }
}

export default RecipeCard;