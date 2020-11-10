import React from 'react';
import RecipeCard from './RecipeCard.js';
import RecipeModal from './RecipeModal.js';
const axios = require('axios');
const loadRecipeURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getRecipeForUser";

class RecipeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalRecipe: null,
            isNewCard: false,
            defaultRecipe: {
                title: "New Recipe",
                author: "Author",
                ingredients: [],
                steps: []
            },
            recipes: []
        }

        
        this.closeModal = this.closeModal.bind(this);
        this.displayModal = this.displayModal.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.setData = this.setData.bind(this);

        this.fetchData();
    }

    componentDidMount() {
        //this.fetchData();
    }

    fetchData() {
        axios.post(loadRecipeURL, {
            "Email": "test2@gmail.com",
        },
        ).then(res => {
            console.log(res)
            this.setData(res);
            console.log(this.props.email)
            console.log(this.state.email)
        });
    }

    setData(res) {
        if (res.data == null) {
            this.setState({ recipes: [] });
        } else {
            this.setState({ recipes: res.data });
        }
    }
    closeModal() {
        this.setState({ showModal: false })
    }

    displayModal(recipeJSON, isNewCard) {
        this.setState({ modalRecipe: recipeJSON, showModal: true , isNewCard: isNewCard});
    }

    addNewCard() {
        //Firebase-Save new default recipe 
        this.displayModal(this.state.defaultRecipe, true);
    }
    render() {
        let recipes = [];
        console.log(this.state);
        this.state.recipes.forEach((recipe, index) => {
            recipes.push(<RecipeCard recipe={recipe} key={index} onClick={this.displayModal} />);
        });

        if (this.state.showModal) {
            return (
                <div className="recipeContainer">
                    <button onClick={this.addNewCard}>New Card</button>
                    {recipes}
                    <RecipeModal key="recipeModal" email={this.props.email} onClose={this.closeModal} isNewCard={this.state.isNewCard} fetchData={this.fetchData} show={this.state.showModal} recipe={this.state.modalRecipe} />
                </div>
            );
        } else {
            return (
                <div className="recipeContainer">
                    <button onClick={this.addNewCard}>New Card</button>
                    {recipes}
                </div>
            );
        }
    }
}

export default RecipeContainer;