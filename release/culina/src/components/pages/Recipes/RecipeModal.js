import React from "react";
import EditableList from "../Modal/EditableList";
import EditableRecipeField from "../Modal/EditableRecipeField";
import DroppableField from "../Modal/DroppableField.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { storage } from "../../../fire";
import blankImage from "./css/images/question_mark.png"
//import './css/RecipeModal.css';

const axios = require("axios");
const addRecipeURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/addRecipeForUser";
const updateRecipeURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/updateRecipe";
const deleteRecipeURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/deleteRecipe";

class RecipeModal extends React.Component {
  constructor(props) {
    super(props);
    // const [image, setImage] = useState(null);

    //Gets all recipe info and puts it into elements with unique ids
    let elementCount = 0;
    let ingElements = this.setUpFieldElements(
      this.props.recipe.ingredients,
      elementCount,
      this.props.recipe.ingredients.length
    );
    elementCount += this.props.recipe.ingredients.length;

    let stepElements = this.setUpFieldElements(
      this.props.recipe.steps,
      elementCount,
      this.props.recipe.steps.length
    );
    elementCount += this.props.recipe.steps.length;

    let titleElement = [];
    if (this.props.recipe.title) {
      titleElement = this.setUpFieldElements(
        [this.props.recipe.title],
        elementCount,
        1
      );
      elementCount += 1;
    }
    let authorElement = [];
    if (this.props.recipe.author) {
      authorElement = this.setUpFieldElements(
        [this.props.recipe.author],
        elementCount,
        1
      );
      elementCount += 1;
    }
    let ocrElements = null;
    if (this.props.ocrResults) {
      ocrElements = this.setUpFieldElements(
        this.props.ocrResults,
        elementCount,
        this.props.ocrResults.length
      );
      elementCount += this.props.ocrResults.length;
    }
    let maxElementLimit = 50;

    if (this.props.recipe != null) {
      this.state = {
        title: this.props.recipe.title,
        author: this.props.recipe.author,
        //ingredients: this.props.recipe.ingredients,
        description: this.props.recipe.description,
        category: this.props.recipe.category,
        imageSRC: this.props.recipe.image,
        public: this.props.recipe.public,
        //steps: this.props.recipe.steps,
        email: props.email,
        isDisabled: !this.props.isNewCard,
        draggableFields: {
          ingredientsField: {
            elements: ingElements, //Array of JSON Objects that hold the content and the id
            elementLimit: maxElementLimit,
          },
          stepsField: {
            elements: stepElements, //Array of JSON Objects that hold the content and the id
            elementLimit: maxElementLimit,
          },
          titleField: {
            elements: titleElement, //Array of JSON Objects that hold the content and the id
            elementLimit: 1,
          },
          authorField: {
            elements: authorElement,
            elementLimit: 1,
          },
          ocrField: {
            elements: ocrElements, //Array of JSON Objects that hold the content and the id
            elementLimit: maxElementLimit,
          },
          nextElementID: elementCount, //Used for adding new elements
        },
      };
    }

    //Function binding
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.exportData = this.exportData.bind(this);
    this.beginEdit = this.beginEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleRemoveElement = this.handleRemoveElement.bind(this);
    this.handleAddElement = this.handleAddElement.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleCommentsChange = this.handleCommentsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleTitleChange=this.handleTitleChange.bind(this);

    // this.titleDivRef = React.createRef();
    // this.ingListRef = React.createRef();
    // this.stepListRef = React.createRef();
    // this.ocrListRef = React.createRef();
    this.imageFieldRef = React.createRef();
    this.categoryFieldRef = React.createRef();
  }

  setUpFieldElements(content, count, length) {
    //console.log(content)
    let newField = [];
    for (let i = 0; i < length; i++) {
      if(content[i].comments){
        let newText = content[i].text;
        let newComments = content[i].comments.map(commentText => {
          return {
            comment: commentText,
            id: getRandomInt(10000)
          }});
          //console.log(newText);
        let newElement = {
          content: {
            text: newText,
            comments: newComments
          },
          id: count
        }
        newField.push(newElement);
      }else{
        let newElement = {
          content: content[i],
          id: count,
        };
        newField.push(newElement);
      }
      count++;
    }
    console.log(newField);
    return newField;
  }

  //Callback function passed to each sub-editable element
  //Updates the html of the element
  handleFieldChange(fieldID, elementID, value) {
    console.log("handleFieldChange")
    if (fieldID == "authorField") {
      this.setState({ author: value });
      return;
    }

    let tempDraggableFields = this.state.draggableFields;
    let fieldInfo = tempDraggableFields[fieldID];
    fieldInfo.elements.forEach((element, index) => {
      if (element.id == elementID) {
        if (fieldID == "titleField") {
          fieldInfo.elements[index].content = value;
        } else {
          fieldInfo.elements[index].content = value;
        }
      }
    });
    tempDraggableFields[fieldID] = fieldInfo;
    this.setState({ draggableFields: tempDraggableFields });
  }
  handleTitleChange(value){
    this.setState({title: value});
  }
  handleAuthorChange(value) {
    this.setState({ author: value });
  }
  handleDescriptionChange(value) {
    this.setState({ description: value });
  }
  handleCommentsChange(commentIndex, value) {
    console.log("handleCommentsChange fired")
    let tempArray = this.state.comments;
    tempArray.forEach((element, index) => {
      if (
        element.list == commentIndex.list &&
        element.element == commentIndex.element
      ) {
        tempArray[index].comment = value;
      }
    });
    this.setState({ comments: tempArray });
  }

  //Enables editing of a card
  beginEdit() {
    this.setState({ isDisabled: false });
  }

  //Exports the data that was edited in the card
  exportData() {
    let draggableFields = this.state.draggableFields;
    let title = "";
    if (draggableFields.titleField.elements.length != 0) {
      title = draggableFields.titleField.elements[0].content;
    }

    let oldIngredients = JSON.parse(JSON.stringify(draggableFields.ingredientsField));

    let ingredients = [];
    let emptyIngredientIndices = [];
    draggableFields.ingredientsField.elements.forEach((element) => {

      let emptyCommentIndices = [];
      let cleansedComment = [];
      element.content.comments.forEach((commentObj, index) => {
        if(commentObj.comment !== ""){
          cleansedComment.push(commentObj.comment);
        }else{
          emptyCommentIndices.push(index)
        }
      });
      for(let i = emptyCommentIndices.length - 1; i > -1; i--){
        element.content.comments.splice(emptyCommentIndices[i],1);
      }
      oldIngredients = JSON.parse(JSON.stringify(draggableFields.ingredientsField));
      element.content.comments = cleansedComment;



      if(element.content.text !== ""){
        ingredients.push(element.content);
      }else{
        emptyIngredientIndices.push(element.id)
      }
     
    });
    emptyIngredientIndices.forEach(index => {
      this.handleRemoveElement("ingredientsField", index)
    })

    let oldSteps = JSON.parse(JSON.stringify(draggableFields.stepsField));

    let steps = [];
    let emptyStepIndices = [];
    draggableFields.stepsField.elements.forEach((element) => {
      let emptyCommentIndices = [];
      let cleansedComment = [];
      element.content.comments.forEach((commentObj, index) => {
        if(commentObj.comment !== ""){
          cleansedComment.push(commentObj.comment);
        }else{
          emptyCommentIndices.push(index)
        }
      });
      for(let i = emptyCommentIndices.length - 1; i > -1; i--){
        element.content.comments.splice(emptyCommentIndices[i],1);
      }
      oldSteps = JSON.parse(JSON.stringify(draggableFields.stepsField));
      element.content.comments = cleansedComment;

      if(element.content.text !== ""){
        steps.push(element.content);
      }else{
        emptyStepIndices.push(element.id);
      }
    });
    emptyStepIndices.forEach(index => {
        this.handleRemoveElement("stepsField", index)
    })

    const savedRecipe = {
      id: this.props.recipe.id,
      email: this.state.email,
      author: this.state.author,
      image: this.props.recipe.image,
      title: this.state.title,
      // should be false and button fro turning off and on
      public: this.state.public,
      likes: 1,
      dislikes: 0,
      description: this.state.description,
      category: this.categoryFieldRef.current.value,
      liked: [this.state.email],
      disliked: [],
      ingredients: ingredients,
      steps: steps,
      copy: this.props.recipe.copy,
    };

    let error_log = "";


    if (savedRecipe.title === "") {
      error_log += "Missing Title \n";
    }
    if (savedRecipe.author === "") {
      error_log += "Missing Author \n";
    }
    if (savedRecipe.description === "") {
      error_log += "Missing Description \n";
    }

    if (error_log.length != 0) {
      return { error_log: error_log };
    }
    draggableFields.ingredientsField = oldIngredients;
    draggableFields.stepsField = oldSteps;
    this.setState({ isDisabled: true, category: savedRecipe.category, draggableFields: draggableFields});
    console.log(savedRecipe);
    return savedRecipe;
  }

  onClose() {
    this.setState({ isDisabled: true });
    this.props.onClose();
  }

  addRecipe() {
    const data = this.exportData();

    if (data.error_log) {
      alert(data.error_log);
      return;
    }

    if (this.state.pictureFile == undefined) {
      axios
        .post(addRecipeURL, data)
        .then((response) => {
          this.props.addLocalCard(response.data);
        })
        .catch((err) => console.log("err", err));
    } else {
      const uploadTask = storage
        .ref(`images/users/${this.state.email}/${this.state.pictureFile.name}`)
        .put(this.state.pictureFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(`images/users/${this.state.email}/`)
            .child(this.state.pictureFile.name)
            .getDownloadURL()
            .then((url) => {
              data.image = url;

              axios
                .post(addRecipeURL, data)
                .then((response) => {
                  this.props.addLocalCard(response.data);
                })
                .catch((err) => console.log("err", err));
            });
        }
      );
    }
  }

  updateRecipe() {
    const data = this.exportData();
      if (data.error_log) {
          console.log("prevented update: \n" + data.error_log)
          alert(data.error_log)
          return;
      }
    if (this.state.pictureFile == undefined) {
      axios
        .put(updateRecipeURL, data)
          .then((response) => {
          this.props.updateLocalCard(data);
        })
        .catch((err) => console.log("err", err));
    } else {
      const uploadTask = storage
        .ref(`images/users/${this.state.email}/${this.state.pictureFile.name}`)
        .put(this.state.pictureFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(`images/users/${this.state.email}/`)
            .child(this.state.pictureFile.name)
            .getDownloadURL()
            .then((url) => {
              data.image = url;

              axios
                .put(updateRecipeURL, data)
                .then((response) => {
                  this.props.updateLocalCard(data);
                })
                .catch((err) => console.log("err", err));
            });
        }
      );
    }
  }

  deleteRecipe() {
    const data = this.exportData();
    axios
      .put(deleteRecipeURL, data)
      .then((response) => this.props.deleteLocalCard(data))
      .catch((err) => console.log("err", err));
  }

  refreshPage() {
    window.location.reload(true);
  }

  handleImageChange = (e) => {
    if (e.target.files[0]) {
      //   setImage(e.target.files[0]);
      let newImageSRC = null;
      if(FileReader){
        console.log("getting image");
        var fr = new FileReader();
        fr.onload = function(){
          console.log("getting image results");
          this.setState({imageSRC: fr.result})
        }.bind(this)
        fr.readAsDataURL(e.target.files[0]);

      }
      console.log(newImageSRC);
      this.setState({ pictureFile: e.target.files[0] });
    }
  };

  handleRemoveElement(fieldID, elementID) {
    let tempDraggableFields = this.state.draggableFields;
    let fieldInfo = tempDraggableFields[fieldID];

    let indexToRemove = -1;
    fieldInfo.elements.forEach((element, index) => {
      if (element.id == elementID) {
        indexToRemove = index;
      }
    });
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

    fieldInfo.elements.push({
      content: {
        text: "",
        comments: [],
      },
      id: tempDraggableFields.nextElementID,
    });

    tempDraggableFields[fieldID] = fieldInfo;
    tempDraggableFields.nextElementID = tempDraggableFields.nextElementID + 1;

    this.setState({ draggableFields: tempDraggableFields });
  }

  handleDragStart(result) {}

  //Passed to DragDropContext to handle drag ends
  handleDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      console.log(
        "element not dropped in any droppables, returning to original position"
      );
      return;
    }

    let tempDraggableFields = this.state.draggableFields;

    //Dropped into the same list
    if (source.droppableId === destination.droppableId) {
      //Item dropped back into same list, reorder list
      let fieldList = tempDraggableFields[destination.droppableId];
      const movedItem = fieldList.elements.splice(source.index, 1)[0];

      fieldList.elements.splice(destination.index, 0, movedItem);

      tempDraggableFields[destination.droppableId] = fieldList;

      this.setState({ draggableFields: tempDraggableFields });
    } else {
      //Field dragging into is full
      if (
        tempDraggableFields[destination.droppableId].elementLimit <=
        tempDraggableFields[destination.droppableId].elements.length
      ) {
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
          <button onClick={this.addRecipe}>Save</button>
          <button className="toggle-button" onClick={this.onClose}>
            {" "}
            Cancel{" "}
          </button>
        </div>
      );
    } else {
      buttons = (
        <div className="actions">
          <button onClick={this.updateRecipe} hidden={this.state.isDisabled}>
            Save
          </button>
          <button onClick={this.beginEdit} hidden={!this.state.isDisabled}>
            Edit
          </button>
          <button onClick={this.deleteRecipe}>Delete</button>
          <button className="toggle-button" onClick={this.onClose}>
            {" "}
            Close{" "}
          </button>
        </div>
      );
    }

    buttons = (
      <div className="actions">
        <button
          className="blueButton"
          onClick={this.props.isNewCard ? this.addRecipe : this.updateRecipe}
          hidden={this.props.isNewCard ? false : this.state.isDisabled}
        >
          Save
        </button>
        <button 
          className="blueButton"
          onClick={this.beginEdit}
          hidden={!this.state.isDisabled}
        >
          Edit
        </button>
        <button
          className="redButton"
          onClick={this.deleteRecipe}
          hidden={this.props.isNewCard ? true : false}
        >
          Delete
        </button>
        <button 
          className="grayButton"
          onClick={this.onClose}>
          {" "}
          {this.props.isNewCard ? "Discard" : "Close"}{" "}
        </button>
      </div>
    );
    //Title Field
    const titleField = (
      <div className={this.state.isDisabled ? "titleDiv" : "titleDiv activated"}>
        <EditableRecipeField
          id={getKeyByValue(this.state, this.state.author)}
          onChange={this.handleTitleChange}
          html={this.state.title}
          tagName={"h4"}
          disabled={this.state.isDisabled}
          placeholderText = "Title"
          childClass="contentEditable"
        />
      </div>
    );
    //Author Field
    const authorField = (
      <div className={this.state.isDisabled ? "authorDiv" : "authorDiv activated"}>
        <EditableRecipeField
          id={getKeyByValue(this.state, this.state.author)}
          onChange={this.handleAuthorChange}
          html={this.state.author}
          tagName={"h4"}
          disabled={this.state.isDisabled}
          placeholderText = "Author"
          childClass="contentEditable"
        />
      </div>
    );

    const descriptionField = (
      <div className={this.state.isDisabled ? "descriptionDiv" : "descriptionDiv activated"}>
        <EditableRecipeField
          id={getKeyByValue(this.state, this.state.description)}
          onChange={this.handleDescriptionChange}
          html={this.state.description}
          tagName={"p"}
          disabled={this.state.isDisabled}
          placeholderText = "Description"
          childClass="contentEditable"
        />
      </div>
    );
    const commentDivs = [];

    let ocrField = this.props.ocrResults ? (
      <div className="ocrDiv">
        <div className="ocrHeader">
          <h1>Scan Output</h1>
          <hr />
        </div>
        <DroppableField
          droppableId="ocrField"
          elements={this.state.draggableFields.ocrField.elements}
          isDisabled={this.state.isDisabled}
          updateGlobalListState={this.handleFieldChange}
          removeElement={this.handleRemoveElement}
          addElement={this.handleAddElement}
          tagType={"p"}
        />
      </div>
    ) : null;
      console.log(this.state.imageSRC);
    return (
      <div className="grayedBackground">
        <div className="modal recipeModal">
          <div
            className={
              this.props.ocrResults
                ? "mainRecipeDiv ocrActive"
                : "mainRecipeDiv"
            }
          >
            <div className="recipeCard">
              <div className="recipeHeader">
                {titleField}
                {authorField}
              </div>
              <div className="recipeBodyImage">
                <img src={this.state.imageSRC ? this.state.imageSRC : blankImage}/>
              </div>
              <div className="recipeBody">
              <div
                className={
                  this.state.isDisabled
                    ? "recipeBodyFooter disabled"
                    : "recipeBodyFooter"
                }
              >
                <div
                  className="recipeBodyFooterElement"
                  hidden={this.state.isDisabled}
                >
                  <label for="fileInput" className="fileInputLabel"> 
                  Change Picture
                  <input
                    className="fileInput"
                    type="file"
                    id="fileInput"
                    accept=".jpg, .png, .jpeg"
                    ref={this.imageFieldRef}
                    onChange={this.handleImageChange}
                  />
                  </label>
                </div>
                <div
                  className="recipeBodyFooterElement"
                  hidden={this.state.isDisabled}
                >
                  <select
                    type="select"
                    id="categories"
                    ref={this.categoryFieldRef}
                    value={this.state.category}
                  >
                    <option value="Breakfast" onClick={()=>{this.setState({category:"Breakfast"})} }>Breakfast</option>
                    <option value="Lunch" onClick={()=>{this.setState({category:"Lunch"})}}>Lunch</option>
                    <option value="Dinner" onClick={()=>{this.setState({category:"Dinner"})}}>Dinner</option>
                    <option value="Dessert" onClick={()=>{this.setState({category:"Dessert"})}}>Dessert</option>
                  </select>
                </div>
                <div 
                  className="recipeBodyFooterElement"
                  hidden={!this.state.isDisabled}
                >
                  <div className={this.state.public ? "publicDiv" : "privateDiv"}>{this.state.public ? "Public" : "Private"}</div>
                </div>
                <div className="recipeBodyFooterElement"
                hidden={this.state.isDisabled}>
                  <div className="visibilityToggleDiv">
                    <div className={this.state.public ? "publicDiv" : "privateDiv"}>{this.state.public ? "Public" : "Private"}</div>
                    <label class="switch">
                      <input type="checkbox" onChange={(event)=>{this.setState({public: !event.target.checked})}}/>
                      <span class="slider round"></span>
                    </label>
                    </div>
                </div>
                
                <div
                  className="recipeBodyFooterElement"
                  hidden={!this.state.isDisabled}
                >
                  <div className="recipeCardFooterCategory">{this.state.category}</div>
                </div>
              </div>
                <div className="recipeInnerBody">
                  {descriptionField}
                  <h3>Ingredients:</h3>
                  <DragDropContext onDragEnd={this.handleDragEnd}>
                    <DroppableField
                      droppableId="ingredientsField"
                      elements={ this.state.draggableFields.ingredientsField.elements }
                      isDisabled={this.state.isDisabled}
                      updateGlobalListState={this.handleFieldChange}
                      removeElement={this.handleRemoveElement}
                      addElement={this.handleAddElement}
                      listType="ul"
                      tagType={"p"}
                      placeholderText="New Ingredient"
                    />
                  </DragDropContext>

                  <h3>Steps:</h3>
                  <DragDropContext onDragEnd={this.handleDragEnd}>
                    <DroppableField
                      droppableId="stepsField"
                      elements={this.state.draggableFields.stepsField.elements}
                      isDisabled={this.state.isDisabled}
                      updateGlobalListState={this.handleFieldChange}
                      removeElement={this.handleRemoveElement}
                      addElement={this.handleAddElement}
                      listType="ol"
                      tagType={"p"}
                      placeholderText="New Step"
                    />
                  </DragDropContext>
                </div>
              </div>
              
            </div>
            {buttons}
          </div>
          {ocrField}
        </div>
      </div>
    );
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default RecipeModal;
