import React from 'react';
import ContentEditable from 'react-contenteditable'

//Editable Field Component
//Renders an editable-version of most HTML tags
class EditableField  extends React.Component {
    //Sets up Editable Field
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.contentEditable = React.createRef();

        this.state = { html: this.props.html };
    }

    //Updates the local state and updateds global copy
    handleChange(event) {
        //New HTML
        const text = event.target.value;
        //Updates local state
        this.setState({html: text})
        //Updates RecipeCard's copy of state
        this.props.onChange(this.props.id, text, this.props.parent);
    }

    //Renders an editable field
    render() {
        return( <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.html}
            disabled={this.props.disabled}
            onChange={this.handleChange}
            tagName={this.props.tagName}
            />
        );
    }
}

class EditableList extends React.Component {
    constructor(props) {
        this.state = {
            elements: [],    //Array that holds the info for all li elements
            id: "",         //String with name of the state key in the "global" state that holds the copy of all elements (ex: "ingredients", "steps")          
            isDisabled: true
        }
    }

    //Passed to sub-elements, acts as middle man for global data and local state data
    handleElementChange(fieldID, html, parent) {
        let tempElements = this.state.elements;
        tempElements[fieldID] = html;
        this.setState({ elements: tempElements });
        this.props.onChange(this.state.id, tempElements, null);
    }

    //Want a + button next to the list header when in edit mode
    //Hitting enter creates a new li element
    //X button at end of li element that allows the element to be deleted entirely 
    render() {
        return;
    }
}

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
    handleFieldChange(fieldId, html, parent) {
        //If the element's html is not stored in a parent array
        if (parent === undefined) {
            this.setState({ [fieldId]: html });
        } else {
            //Updates the array stored in state
            let tempParent = this.state[parent]
            tempParent[fieldId] = html;
            this.setState({[parent]: tempParent});
        }
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

        //State elements that are not arrays: ID = state key, parent = undefined
        //State elements that are arrays: ID = index, parent = state key
        //IDs + Parent used to update children's html 

        console.log("rendering");
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

        //Ingredient Fields
        var ingredientFields = [];
        this.state.ingredients.forEach((ing, index) => {
            ingredientFields.push(
                <EditableField
                    key={index}
                    id={index}
                    onChange={this.handleFieldChange}
                    html={ing}
                    tagName={"li"}
                    parent={getKeyByValue(this.state, this.state.ingredients)}                               
                    disabled={this.state.isDisabled}
                />);
        })
        
        //Step Fields
        var stepFields = [];
        this.state.steps.forEach((step, index) => {
            stepFields.push(
                <EditableField
                    key={index}
                    id={index}
                    onChange={this.handleFieldChange}
                    html={step}
                    tagName={"li"}
                    parent={getKeyByValue(this.state, this.state.steps)}
                    disabled={this.state.isDisabled}
                />);
        });

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
                    <h3>Ingredients:</h3>
                    <ul className="ingredients">
                        {ingredientFields}
                    </ul>
                    <h3>Steps:</h3>
                    <ol className="steps">
                        {stepFields}
                    </ol>
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
