import React from 'react';
import RecipeCard from './RecipeCard.js';
import RecipeModal from './RecipeModal.js';
const axios = require('axios');
const loadRecipeURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getRecipeForUser";

class RecipeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalRC: false,
            modalRecipe: null,
            isNewCard: false,
            defaultRecipe: {
                title: "New Recipe",
                author: "Author",
                ingredients: [],
                steps: []
            },
            recipes: [],
            email: props.email
        }

        
        this.closeModal = this.closeModal.bind(this);
        this.displayModalRC = this.displayModalRC.bind(this);
        this.displayBlankCard = this.displayBlankCard.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.setData = this.setData.bind(this);
        this.addNewCardLocally = this.addNewCardLocally.bind(this);
        this.deleteCardLocally = this.deleteCardLocally.bind(this);
        this.updateCardLocally = this.updateCardLocally.bind(this);

        this.fetchData();
    }

    // componentDidMount() {
    //     console.log("Mounted RecipeContainer") 
    // }

    fetchData() {
        axios.post(loadRecipeURL, {
            "Email": this.props.email,
        },
        ).then(res => {
            this.setData(res);
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
        this.setState({ showModalRC: false })
    }

    displayModalRC(recipeJSON, isNewCard) {
        this.setState({ modalRecipe: recipeJSON, showModalRC: true , isNewCard: isNewCard});
        this.setState({ modalRecipe: recipeJSON, showModalRC: true , isNewCard: isNewCard}, () =>
        console.log(this.state)
        );
    }

    displayBlankCard() {
        this.displayModalRC(this.state.defaultRecipe, true);
    }

    addNewCardLocally(recipeJSON) {
        var tempCards = this.state.recipes
        tempCards.push(recipeJSON)
        this.setState({ recipes: tempCards })

        this.closeModal()
    }

    deleteCardLocally(recipeJSON) {
        var tempCards = this.state.recipes;
        var didUpdate = false;
        tempCards.forEach((recipe, index) => {
            const current_id = recipe.id;
            if (current_id == recipeJSON.id) {
                tempCards.splice(index, 1)
                didUpdate = true;
            }
        }) 
        console.log(didUpdate ? "Recipe deleted" : "No recipe deleted");
        this.setState({recipes: tempCards})
        this.closeModal()
    }

    updateCardLocally(recipeJSON) {
        var tempCards = this.state.recipes;
        var didUpdate = false;
        tempCards.forEach((recipe, index) => {
            const current_id = recipe.id;
            if (current_id == recipeJSON.id) {
                tempCards[index] = recipeJSON;
                didUpdate = true;
            }
        }) 
        this.setState({recipes: tempCards})
    }


    render() {
        let recipes = [];
        this.state.recipes.forEach((recipe, index) => {
            recipes.push(<RecipeCard recipe={recipe} key={index} onClick={this.displayModalRC} />);
        });

        if (this.state.showModalRC) {
            console.log("in")
            return (
                <div className="recipeContainer">
                    <button onClick={this.displayBlankCard}>New Card</button>
                    {recipes}
                    <RecipeModal key="recipeModal" email={this.props.email} onClose={this.closeModal} isNewCard={this.state.isNewCard}
                        fetchData={this.fetchData} show={this.state.showModalRC} recipe={this.state.modalRecipe} addLocalCard={this.addNewCardLocally} updateLocalCard={this.updateCardLocally}
                        deleteLocalCard={this.deleteCardLocally} />
                </div>
            );
        } else {
            return (
                <div className="recipeContainer">
                    <button onClick={this.displayBlankCard}>New Card</button>
                    {recipes}
                </div>
            );
        }
    }
}

export default RecipeContainer;