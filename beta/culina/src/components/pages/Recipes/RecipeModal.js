import React from 'react';
import EditableList from '../Modal/EditableList';
import EditableField from '../Modal/EditableField';
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
                email: props.email,
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
        this.refreshPage = this.refreshPage.bind(this)
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
            "id": this.props.recipe.id,
            "email": this.props.email,
            "author": this.state.author,
            "title": this.state.title,
            "ingredients": this.state.ingredients,
            "steps": this.state.steps
        }
        this.setState({ isDisabled: true });
        return savedRecipe;
    }

    onClose() {
        this.props.onClose();
    }


    addRecipe() {
        const data = this.exportData();
        axios.post(addRecipeURL, data)
            .then(response => {
            this.props.addLocalCard(data)
        })
        .catch(err => console.log('err', err));

    }

    updateRecipe() {
        const data = this.exportData();
        axios.put(updateRecipeURL, data) 
            .then(response => this.props.updateLocalCard(data))
            .catch(err => console.log('err', err));
    }
    
    deleteRecipe() {
        const data = this.exportData();
        axios.put(deleteRecipeURL, data)
            .then(response => this.props.deleteLocalCard(data))
            .catch(err => console.log('err', err));
    }

    refreshPage() {
        window.location.reload(true)
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

}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export default RecipeModal;