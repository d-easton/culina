import React from 'react';
import EditableList from './EditableList.js';
import EditableField from './EditableField.js';
import DroppableField from './DroppableField.js';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './RecipeModal.css'

const axios = require('axios');
const addRecipeURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/addRecipeForUser";
const updateRecipeURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/updateRecipe";
const deleteRecipeURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/deleteRecipe";


class RecipeModal extends React.Component {
    constructor(props) {
        super(props);

        //Gets all recipe info and puts it into elements with unique ids
        let elementCount = 0;
        let ingElements = this.setUpFieldElements(this.props.recipe.ingredients, elementCount,
            this.props.recipe.ingredients.length);
        elementCount += this.props.recipe.ingredients.length;

        let stepElements = this.setUpFieldElements(this.props.recipe.steps, elementCount, this.props.recipe.steps.length);
        elementCount += this.props.recipe.steps.length;

        let titleElement = [];
        if (this.props.recipe.title) {
            titleElement = this.setUpFieldElements([this.props.recipe.title], elementCount, 1);
            elementCount += 1;
        }
        let authorElement = [];
        if (this.props.recipe.author) {
            authorElement = this.setUpFieldElements([this.props.recipe.author], elementCount, 1);
            elementCount += 1;
        }
        let ocrElements = null;
        if (this.props.ocrResults) {
            ocrElements = this.setUpFieldElements(this.props.ocrResults, elementCount, this.props.ocrResults.length);
            elementCount += this.props.ocrResults.length;
        }


        let maxElementLimit = 50;

        if (this.props.recipe != null) {
            this.state = {
                title: this.props.recipe.title,
                author: this.props.recipe.author,
                ingredients: this.props.recipe.ingredients,
                steps: this.props.recipe.steps,
                isDisabled: !this.props.isNewCard,
                draggableFields: {
                    ingredientsField: {
                        elements: ingElements,            //Array of JSON Objects that hold the content and the id
                        elementLimit: maxElementLimit
                    },
                    stepsField: {
                        elements: stepElements,            //Array of JSON Objects that hold the content and the id
                        elementLimit: maxElementLimit
                    },
                    titleField: {
                        elements: titleElement,            //Array of JSON Objects that hold the content and the id
                        elementLimit: 1 
                    },
                    authorField: {
                        elements: authorElement,
                        elementLimit: 1
                    },
                    ocrField: {
                        elements: ocrElements,            //Array of JSON Objects that hold the content and the id
                        elementLimit: maxElementLimit
                    },
                    nextElementID: elementCount           //Used for adding new elements
                }
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
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleRemoveElement = this.handleRemoveElement.bind(this);
        this.handleAddElement = this.handleAddElement.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);

        this.titleDivRef = React.createRef();
        this.ingListRef = React.createRef();
        this.stepListRef = React.createRef();
        this.ocrListRef = React.createRef();
    }

    setUpFieldElements(content, count, length) {
        let newField = [];
        for (let i = 0; i < length; i++) {
            let newElement = {
                content: content[i],
                id: count
            }
            newField.push(newElement);
            count++;
        }
        return newField;

    }

    componentDidUpdate() {
    }
    //Callback function passed to each sub-editable element
    //Updates the html of the element
    handleFieldChange(fieldID, elementID, value) {
        if (fieldID == "authorField") {
            this.setState({ author: value });
            return;
        }

        let tempDraggableFields = this.state.draggableFields;
        let fieldInfo = tempDraggableFields[fieldID];
        fieldInfo.elements.forEach((element, index) => {
            if (element.id == elementID) {
                fieldInfo.elements[index].content = value;
            }
        });
        tempDraggableFields[fieldID] = fieldInfo;
        this.setState({ draggableFields: tempDraggableFields });
    }

    handleAuthorChange(value) {
        this.setState({ author: value });
    }

    //Enables editing of a card
    beginEdit() {
        this.setState({ isDisabled: false });
    }

    //Exports the data that was edited in the card
    exportData() {
        console.log("exporting data");

        let draggableFields = this.state.draggableFields;
        let title = "";
        if (draggableFields.titleField.elements.length != 0) {
             title = draggableFields.titleField.elements[0].content;
        }
        let ingredients = [];
        draggableFields.ingredientsField.elements.forEach(element => {
            ingredients.push(element.content);
        });

        let steps = [];
        draggableFields.stepsField.elements.forEach(element => {
            steps.push(element.content);
        })


        const savedRecipe = {
            "id": this.props.recipe.id,
            "email": "test2@gmail.com",
            "author": this.state.author,
            "title": title,
            "ingredients": ingredients,
            "steps": steps 
        }
        this.setState({ isDisabled: true });

        console.log("savedRecipe = ");
        console.log(savedRecipe);

        return savedRecipe;
    }

    onClose() {
        this.setState({ isDisabled: true });
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
        this.props.updateLocalCard(data);
        axios.put(updateRecipeURL, data) 
            .then(response => this.props.updateLocalCard(data))
            .catch(err => console.log('err', err));
    }
    
    deleteRecipe() {
        const data = this.exportData();
        this.props.deleteLocalCard(data);
        axios.put(deleteRecipeURL, data)
            .then(response => this.props.deleteLocalCard(data))
            .catch(err => console.log('err', err));
    }

    refreshPage() {
        //window.location.reload(true)
    }


    handleRemoveElement(fieldID, elementID) {
        let tempDraggableFields = this.state.draggableFields;
        let fieldInfo = tempDraggableFields[fieldID];

        let indexToRemove = -1;
        fieldInfo.elements.forEach((element, index) => {
            if (element.id == elementID) {
                indexToRemove = index;
            }
        })
        fieldInfo.elements.splice(indexToRemove, 1);

        tempDraggableFields[fieldID] = fieldInfo;
        this.setState({ draggableFields: tempDraggableFields });
    }

    handleAddElement(fieldID) {
        let tempDraggableFields = this.state.draggableFields;
        let fieldInfo = tempDraggableFields[fieldID];

        if (fieldInfo.elementLimit <= fieldInfo.elements.length) {
            alert("This field is full");
            return;
        }

        fieldInfo.elements.push({ content: "New Element", id: tempDraggableFields.nextElementID });

        tempDraggableFields[fieldID] = fieldInfo;
        tempDraggableFields.nextElementID = tempDraggableFields.nextElementID + 1;

        this.setState({ draggableFields: tempDraggableFields });
       
    }

    handleDragStart(result) {

    }

    //Passed to DragDropContext to handle drag ends
    handleDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            console.log("element not dropped in any droppables, returning to original position");
            return;
        }

        let tempDraggableFields = this.state.draggableFields;

        

        //Dropped into the same list
        if (source.droppableId === destination.droppableId) {
            //Item dropped back into same list, reorder list
            let fieldList = tempDraggableFields[destination.droppableId];
            const movedItem = fieldList.elements.splice(source.index, 1)[0]


            fieldList.elements.splice(destination.index, 0, movedItem);

            tempDraggableFields[destination.droppableId] = fieldList;


            this.setState({ draggableFields: tempDraggableFields });
        } else {
            //Field dragging into is full
            if (tempDraggableFields[destination.droppableId].elementLimit <= tempDraggableFields[destination.droppableId].elements.length) {
                alert("This field is full");
                return;
            }
            //Element dropped into new list, remove from source and add to destination
            let destinationFieldList = tempDraggableFields[destination.droppableId];
            let sourceFieldList = tempDraggableFields[source.droppableId];

            const movedItem = sourceFieldList.elements.splice(source.index, 1)[0];

            destinationFieldList.elements.splice(destination.index, 0, movedItem);


            tempDraggableFields[destination.droppableId] = destinationFieldList;
            tempDraggableFields[source.droppableId] = sourceFieldList;

            this.setState({ draggableFields: tempDraggableFields });
        }
    }

    
    render() {

        let buttons;
        if (this.props.isNewCard) {
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
        
        buttons = (
                <div className="actions">
                    <button onClick={this.props.isNewCard ? this.addRecipe : this.updateRecipe} hidden={this.props.isNewCard ? false : this.state.isDisabled}>Save</button>
                    <button onClick={this.beginEdit} hidden={!this.state.isDisabled}>Edit</button>
                    <button onClick={this.deleteRecipe} hidden={this.props.isNewCard ? true : false}>Delete</button>
                    <button className="toggle-button" onClick={this.onClose} > {this.props.isNewCard ? "Discard" : "Close"} </button>
                </div>
        );
        //Author Field
        const authorField =  <div className="authorDiv">
            <h2>By: </h2>
                <EditableField
                    id={getKeyByValue(this.state, this.state.author)}
                    onChange={this.handleAuthorChange}
                    html={this.state.author}
                    tagName={"h2"}
                    disabled={this.state.isDisabled}
                />
            </div>;
        let ocrField = this.props.ocrResults ? (
            <div className="ocrDiv">
                <div className="ocrHeader">
                    <h1>Scan Output</h1>
                    <hr/>
                </div>
                <DroppableField droppableId="ocrField"
                    elements={this.state.draggableFields.ocrField.elements}
                    isDisabled={this.state.isDisabled}
                    updateGlobalListState={this.handleFieldChange}
                    removeElement={this.handleRemoveElement}
                    addElement={this.handleAddElement}
                    tagType={"p"}
                />
            </div>) : null;
        return (
            <DragDropContext onDragEnd={this.handleDragEnd} onDragStart={this.handleDragStart}>
                <div className="grayedBackground">
                    <div className="modal recipeModal">
                        <div className={this.props.ocrResults ? "mainRecipeDiv ocrActive" : "mainRecipeDiv"}>
                            <div className="recipeCard">
                                <div className="recipeHeader">
                                    <DroppableField  droppableId="titleField"
                                        elements={this.state.draggableFields.titleField.elements}
                                        isDisabled={this.state.isDisabled}
                                        updateGlobalListState={this.handleFieldChange}
                                        removeElement={this.handleRemoveElement}
                                        addElement={this.handleAddElement}
                                        tagType={"h1"}
                                    />
                                    {authorField}
                                    <hr/>
                                </div>
                                <div className="recipeBody">
                                    <div className="recipeInnerBody">
                                        <h3>Ingredients:</h3>
                                        <DroppableField droppableId="ingredientsField"
                                            elements={this.state.draggableFields.ingredientsField.elements}
                                            isDisabled={this.state.isDisabled}
                                            updateGlobalListState={this.handleFieldChange}
                                            removeElement={this.handleRemoveElement}
                                            addElement={this.handleAddElement}
                                            listType="ul"
                                            tagType={"p"}
                                        />

                                        <h3>Steps:</h3>
                                        <DroppableField droppableId="stepsField"
                                            elements={this.state.draggableFields.stepsField.elements}
                                            isDisabled={this.state.isDisabled}
                                            updateGlobalListState={this.handleFieldChange}
                                            removeElement={this.handleRemoveElement}
                                            addElement={this.handleAddElement}
                                            listType="ol"
                                            tagType={"p"}
                                        />
                                    </div>
                                </div>
                            </div>
                            {buttons}
                        </div>
                        {ocrField}
                  
                    </div>
                </div>
            </DragDropContext>
            );
    }
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export default RecipeModal;