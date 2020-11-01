import React from 'react';
import EditableField from './EditableField.js';
import EditableList from './EditableList.js';

//Editable Recipe Card React Components
class EditRecipeCard extends React.Component {
    //Sets up state for all sub-editable elements
    //EditRecipeCard class manages the state of all sub components
    constructor(props) {
        super(props);

        //The recipe info passed to the component
        let recipe = this.props.recipe;

        
        //Adds all of the card's starting info into state
        //State is updated when the elements are edited
        this.state = {
            title: recipe.header.recipeTitle,
            author: recipe.header.author,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            isDisabled: true
        };

        //Function binding
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.beginEdit = this.beginEdit.bind(this);
    }

    //Callback function passed to each sub-editable element
    //Updates the html of the element
    handleFieldChange(stateKey, value) {
        this.setState({ [stateKey]: value });
    }

    //Enables editing of a card
    beginEdit() {
        this.setState({isDisabled: false}); 
    }

    //Exports the data that was edited in the card
    saveChanges() {
        //Converts state info back into Firebase JSON object for recipe cards
        const savedRecipe = {
            header: {
                recipeTitle: this.state.title,
                author: this.state.author
            },
            ingredients: this.state.ingredients,
            steps: this.state.steps
        }
        this.setState({ isDisabled: true });
        console.log(savedRecipe);
    }


    //Renders Card
    render() {

        //Recipe Title Field
        const titleField = <EditableField
            id={getKeyByValue(this.state, this.state.title)}
            onChange={this.handleFieldChange}
            html={this.state.title}
            tagName={"h1"}
            disabled={this.state.isDisabled}
        />;

        //Author Field
        const authorField = <EditableField
            id={getKeyByValue(this.state, this.state.author)}
            onChange={this.handleFieldChange}
            html={this.state.author}
            tagName={"h2"}
            disabled={this.state.isDisabled}
        />;

        const ingredientsList = <EditableList
            elements={this.state.ingredients}
            id={getKeyByValue(this.state, this.state.ingredients)}
            isOrdered={false}
            isDisabled={this.state.isDisabled}
            onChange={this.handleFieldChange}
            listTitle={"Ingredients: "}
        />;


        const stepsList = <EditableList
            elements={this.state.steps}
            id={getKeyByValue(this.state, this.state.steps)}
            isOrdered={false}
            isDisabled={this.state.isDisabled}
            onChange={this.handleFieldChange}
            listTitle={"Steps: "}
        />;
        
        //Whole Card put together
        return (
            <div className="recipeCard">
                <div className="header">
                    {titleField}
                    <div className="authorDiv">
                        <h2>By: </h2>
                        {authorField}
                    </div>
                </div>
                <div className="mainBody"> 
                    {ingredientsList}
                    {stepsList} 
                </div>
                <input type="submit" onClick={this.saveChanges} value="Save" hidden={this.state.isDisabled}/>
                <input type="submit" onClick={this.beginEdit} value="Edit" hidden={!this.state.isDisabled}/>
            </div>
        );
    }
}

//Returns the an object's key based off of a given value
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export default EditRecipeCard;
