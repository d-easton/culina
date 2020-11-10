import React from 'react';
import EditableList from './EditableList.js';
import EditableField from './EditableField.js';
const axios = require('axios');
const addRecipeURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/addRecipeForUser";
const updateRecipeURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/updateRecipe";
const deleteRecipeURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/deleteRecipe";


class RecipeModal extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.recipe != null) {
            this.state = {
                title: this.props.recipe.title,
                author: this.props.recipe.author,
                ingredients: this.props.recipe.ingredients,
                steps: this.props.recipe.steps,
                isDisabled: true,
            }
        }
        //Function binding
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.exportData = this.exportData.bind(this);
        this.beginEdit = this.beginEdit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);       
        this.deleteRecipe = this.deleteRecipe.bind(this);
    }
    //Callback function passed to each sub-editable element
    //Updates the html of the element
    handleFieldChange(stateKey, value) {
        this.setState({ [stateKey]: value });
    }

    //Enables editing of a card
    beginEdit() {
        this.setState({ isDisabled: false });
    }

    //Exports the data that was edited in the card
    exportData() {
        //Converts state info back into Firebase JSON object for recipe cards
        const savedRecipe = {
            "Email": "test@gmail.com",
            "Author": this.state.author,
            "Title": this.state.title,
            "Ingredients": this.state.ingredients,
            "Steps": this.state.steps
        }
        this.setState({ isDisabled: true });
        return savedRecipe;
    }

    onClose() {
        this.props.onClose();
    }


    addRecipe() {
        const data = this.exportData();
        console.log("saving recipe");
        console.log(data);
        console.log(this.props.email);
            //for creating a recipe for a user
        axios.post(addRecipeURL, {
                    "Email": "test2@gmail.com",
                    "Author": this.state.author,
                    "Title": this.state.title,
                    "Ingredients": this.state.ingredients,
                    "Steps": this.state.steps
                },
        ).then(response => {
            console.log(response)
            console.log("done")
        })
        .catch(err => console.log('err', err));

    }

    updateRecipe() {
        console.log(this.props.recipe)
        const data = this.exportData();
        axios.put(updateRecipeURL, {
                "ID": this.props.recipe.id,
                "Email": "test2@gmail.com",
                "Author": this.state.author,
                "Title": this.state.title,
                "Ingredients": this.state.ingredients,
                "Steps": this.state.steps
            }) 
            .then(response => this.props.fetchData)
            .catch(err => console.log('err', err));
    }
    
    deleteRecipe() {
        const data = this.exportData();
        axios.put(deleteRecipeURL, {
                "ID": this.props.recipe.id,
                "Email": "test2@gmail.com",
                "Author": this.state.author,
                "Title": this.state.title,
                "Ingredients": this.state.ingredients,
                "Steps": this.state.steps
            })
            .then(response => this.props.fetchData)
            .catch(err => console.log('err', err));
    }
    render() {
        if (!this.props.show) {
            return null;
        }

        let buttons;
        let isDisabled = this.state.isDisabled;
        if (this.props.isNewCard) {
            isDisabled = false; 
            buttons = (
                <div className="actions">
                    <button onClick={this.addRecipe} >Save</button>
                    <button className="toggle-button" onClick={this.onClose} > Cancel </button>
                </div>
            );
        } else {
            buttons = (
                <div className="actions">
                    <button onClick={this.updateRecipe} hidden={this.state.isDisabled}>Save</button>
                    <button onClick={this.beginEdit} hidden={!this.state.isDisabled}>Edit</button>
                    <button onClick={this.deleteRecipe}>Delete</button>
                    <button className="toggle-button" onClick={this.onClose} > Close </button>
                </div>
            );
        }
        //Recipe Title Field
        const titleField = <EditableField
            id={getKeyByValue(this.state, this.state.title)}
            onChange={this.handleFieldChange}
            html={this.state.title}
            tagName={"h1"}
            disabled={isDisabled}
        />;

        //Author Field
        const authorField = <EditableField
            id={getKeyByValue(this.state, this.state.author)}
            onChange={this.handleFieldChange}
            html={this.state.author}
            tagName={"h2"}
            disabled={isDisabled}
        />;

        const ingredientsList = <EditableList
            elements={this.state.ingredients}
            id={getKeyByValue(this.state, this.state.ingredients)}
            isOrdered={false}
            isDisabled={isDisabled}
            onChange={this.handleFieldChange}
            listTitle={"Ingredients: "}
            elementName={"Ingredient"}
        />;


        const stepsList = <EditableList
            elements={this.state.steps}
            id={getKeyByValue(this.state, this.state.steps)}
            isOrdered={true}
            isDisabled={isDisabled}
            onChange={this.handleFieldChange}
            listTitle={"Steps: "}
            elementName={"Step"}
        />;

        
        return (
            <div className="modal" >
                <div className="editRecipeCard">
                    <div className="recipeHeader editable">
                        {titleField}
                        <div className="authorDiv">
                            <h2>By: </h2>
                            {authorField}
                        </div>
                    </div>
                    <div className="recipeBody editable">
                        {ingredientsList}
                        {stepsList}
                    </div>
                </div>
                {buttons}
            </div>
        );
    }

    //Edit Card: same buttons
    //New Card: save or cancel 
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export default RecipeModal;