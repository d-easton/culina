import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EditRecipeCard from './RecipeDisplay.js';

// Convert to class component and add ability to dynamically add/remove fields by having it in state
const App = () => {

    const testRecipe = {
        header: {
            recipeTitle: "Ham and Cheese",
            author: "Ethan"
        },
        ingredients: [
            "Ham",
            "Cheese",
            "Bread"
        ],
        steps: [
            "Put bread on plate",
            "Put ham on bread",
            "Put cheese over ham",
            "Put bread over cheese"
        ]
    } 

    return <EditRecipeCard recipe={testRecipe} />;
};

ReactDOM.render(<App />, document.body);
