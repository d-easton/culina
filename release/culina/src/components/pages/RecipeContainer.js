import React from "react";
import RecipeCard from "./Recipes/RecipeCard.js";
import RecipeModal from "./Recipes/RecipeModal.js";
import Navbar from "./Navbar";
import ImageButton from "./Modal/ImageButton.js"
import "./Recipes/css/RecipeModal.css";
import removeButton from './Modal/images/close_icon.png';
const axios = require("axios");
const loadRecipeURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getRecipeForUser";

class RecipeContainer extends React.Component {
  constructor(props) {
    super(props);

    //FOR TESTING COMMENTS
    /*
            const testCommentRecipe = {
                author: "Austin Evans",
                email: "test2@gmail.com",
                id: 12345,
                ingredients: [
                    {
                        text: "Chicken",
                        comments: ["go for breasts next time"]
                    },
                    {
                        text: "Salt",
                        comments: []
                    },
                    {
                        text: "Pepper",
                        comments: []
                    }
                ],
                steps: [
                    {
                        text: "Season chicken with salt and pepper",
                        comments: ["add more salt next time"]
                    },
                    {
                        text: "Bake in oven at 375 for 40 minutes",
                        comments: []
                    }
                ],
                title: "Baked Chicken",
            }
    */
    //const testData = [testCommentRecipe]

    //console.log(testData)
    this.state = {
      showModalRC: false,
      showNewCardOption: false,

      modalRecipe: null,
      isNewCard: false,
      defaultRecipe: {
        title: "New Recipe",
        author: "Author",
        description: "Add description",
        ingredients: [],
        steps: [],
        copy: false,
      },
      //recipes: testData,
      recipes: [],
      ocrOutput: null,
      email: props.user.email,
      isFilterDropdownVisible: false,
      searchQuery: "",
      categoryFilter: null
    };

    this.closeModal = this.closeModal.bind(this);
    this.displayModalRC = this.displayModalRC.bind(this);
    this.displayBlankCard = this.displayBlankCard.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setData = this.setData.bind(this);
    this.addNewCardLocally = this.addNewCardLocally.bind(this);
    this.deleteCardLocally = this.deleteCardLocally.bind(this);
    this.updateCardLocally = this.updateCardLocally.bind(this);
    this.displayNewCardPrompt = this.displayNewCardPrompt.bind(this);
    this.displayOCRUploadField = this.displayOCRUploadField.bind(this);
    this.uploadRecipeImage = this.uploadRecipeImage.bind(this);
    this.handleCategoryFilters = this.handleCategoryFilters.bind(this);

    this.uploadField = React.createRef();
    this.searchBox = React.createRef();

    //UNDO AFTER SERVER FIXED
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log("fetching data");
    axios
      .post(loadRecipeURL, {
        //headers: {
          //'Access-Control-Allow-Origin' : '*',
        //},
        Email: this.state.email,
      })
      .then((res) => {
        //TESTING
        //Mimick ocrOutput being included in backend
        /*
                    const testOCROutput = {
                        id: "ocrOutput",
                        output: ["Ham and cheese", "Ham", "Cheese",
                            "Assemble Sandwich"]
                    }
                    res.data.push(testOCROutput);
                    console.log(res.data);
                    //DELETE AFTER OCR SET IN FIRESTORE
                    */

        this.setData(res.data);
      });
  }

  setData(data) {
    if (data == null) {
      this.setState({ recipes: [] });
    } else {
      let ocr = null;
      data.forEach((element, index) => {
        if (element.id == "ocrOutput") {
          ocr = element.output;
          data.splice(index, 1);
          this.setState({
            modalRecipe: this.state.defaultRecipe,
            isNewCard: true,
          });
        }
      });
      this.setState({ recipes: data, ocrOutput: ocr });
    }
  }
  closeModal() {
    this.setState({ showModalRC: false, ocrOutput: null });
  }

  displayModalRC(recipeJSON, isNewCard) {
    this.setState({
      modalRecipe: recipeJSON,
      showModalRC: true,
      isNewCard: isNewCard,
    });
  }

  displayBlankCard() {
    this.setState({ showNewCardOption: false });
    this.displayModalRC(this.state.defaultRecipe, true);
  }

  displayNewCardPrompt() {
    this.setState({ showNewCardOption: true, showModal: false });
  }

  displayOCRUploadField() {
    this.setState({ showUploadOption: true, showNewCardOption: false });
  }


  uploadRecipeImage() {
    //Server post of uploaded photo
    //Display buffer until get a response
    const node = this.uploadField.current;
    if (node.value == "") {
      alert("Please Upload an Image");
    } else {
      alert("Uploading image");
      this.setState({ showUploadOption: false, showBuffering: true });
    }
  }

  addNewCardLocally(recipeJSON) {
    var tempCards = this.state.recipes;
    tempCards.push(recipeJSON);
    this.setState({ recipes: tempCards });

    this.closeModal();
  }

  deleteCardLocally(recipeJSON) {
    var tempCards = this.state.recipes;
    var didUpdate = false;
    tempCards.forEach((recipe, index) => {
      const current_id = recipe.id;
      if (current_id == recipeJSON.id) {
        tempCards.splice(index, 1);
        didUpdate = true;
      }
    });
    this.setState({ recipes: tempCards });
    this.closeModal();
  }

  handleCategoryFilters(category){
    console.log("changing filter to " + category)
    let newCategory = null;
    let currentCategory = this.state.categoryFilter;
    switch(category){
      case "Breakfast":
        newCategory = currentCategory === "Breakfast" ? null : "Breakfast"
        break;
      case "Lunch":
        newCategory = currentCategory === "Lunch" ? null : "Lunch"
        break;
      case "Dinner":
        newCategory = currentCategory === "Dinner" ? null : "Dinner"
        break;
      case "Dessert":
        newCategory = currentCategory === "Dessert" ? null : "Dessert"
        break;
    }
    this.setState({categoryFilter: newCategory})
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
    });
    this.setState({ recipes: tempCards });
  }

  render() {
    const renderModal = this.state.showModal || this.state.ocrOutput;
    let _email = this.state.email;
    let recipes = [];
    this.state.recipes.forEach((recipe, index) => {
      let addToRecipes = true;
      console.log(this.state.categoryFilter);
      console.log(recipe.category)
      if(this.state.categoryFilter !== null && this.state.categoryFilter !== recipe.category){
        console.log("removing from render");
        addToRecipes = false;
      }
      if(this.state.searchQuery !== ""){
        let query = this.state.searchQuery.toLowerCase();
        if(!recipe.title.toLowerCase().includes(query)){
          addToRecipes = false;
        }
      }
      recipes.push(
        <RecipeCard
          recipe={recipe}
          key={index}
          email={_email}
          onClick={this.displayModalRC}
          modalEnabled={renderModal}
          isHidden={!addToRecipes}
        />);
    });

    let modal = null;
    let bodyOverflow = "scroll";
    bodyOverflow = "hidden";
    if (this.state.ocrOutput != null || this.state.showModalRC == true) {
      modal = (
        <RecipeModal
          key="recipeModal"
          email={this.state.email}
          onClose={this.closeModal}
          isNewCard={this.state.isNewCard}
          fetchData={this.fetchData}
          show={this.state.showModalRC}
          recipe={this.state.modalRecipe}
          addLocalCard={this.addNewCardLocally}
          updateLocalCard={this.updateCardLocally}
          deleteLocalCard={this.deleteCardLocally}
          ocrResults={this.state.ocrOutput}
          setDraggableFields={this.props.setDraggableFields}
        />
      );
    } else if (this.state.showNewCardOption) {
      modal = (
        <div className="grayedBackground">
          <div className="modal">
            <div className="newCardOptionsDiv">
              <h1>How would you like to upload a new card?</h1>
              <div className="manualOption">
                <h2>Manual</h2>
                <p>Manually type and upload a card</p>
                <button onClick={this.displayBlankCard}>
                  Start Manual Card
                </button>
              </div>
              <div className="automaticOption">
                <h2>Automatic</h2>
                <p>
                  Upload a photo of a recipe and have Culina take care of the
                  typing!
                </p>
                <button onClick={this.displayOCRUploadField}>
                  Upload Photo
                </button>
              </div>
              <button onClick={this.closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      );
    } else if (this.state.showUploadOption) {
      modal = (
        <div className="grayedBackground">
          <div className="modal">
            <div className="uploadImageDiv">
              <h1>Upload Image</h1>
              <p>Upload a PNG or JPG</p>
              <input type="file" accept=".jpg, .png" ref={this.uploadField} />
              <button onClick={this.uploadRecipeImage}>Upload</button>
            </div>
          </div>
        </div>
      );
    }

    document.body.style.overflow = modal == null ? "scroll" : "hidden";

    return (
      <div className="around-page">
        <div className="recipeContainer">
          <div className="containerTools">
            <div className="filterDiv">
              <button className="filterRecipeButton" onClick={()=>{this.setState({isFilterDropdownVisible: !this.state.isFilterDropdownVisible});}}> Filter </button>
              <div className={this.state.isFilterDropdownVisible ? "filterDropdown show" : "filterDropdown"}>
                <div className="searchOption">
                  Search
                  <input type="text" placeholder="Search Titles" onChange={(event)=>{this.setState({searchQuery: event.target.value})}} ref={this.searchBox}/>
                  <ImageButton childClass={"clearButton"} alt={"clear text"} imagePath={removeButton} onPress={()=>{
                    console.log("pressed");
                    this.searchBox.current.value = "";
                    this.setState({searchQuery: ""})
                    }} />
                </div>
                <div className="filterOptions">
                  Filter by:
                  <input className={this.state.categoryFilter === "Breakfast" ? "categoryFilterButton active" : "categoryFilterButton"} type="button" value="Breakfast" onClick={()=>{this.handleCategoryFilters("Breakfast")}} />
                  <input className={this.state.categoryFilter === "Lunch" ? "categoryFilterButton active" : "categoryFilterButton"} type="button" value="Lunch" onClick={()=>{this.handleCategoryFilters("Lunch")}} />
                  <input className={this.state.categoryFilter === "Dinner" ? "categoryFilterButton active" : "categoryFilterButton"} type="button" value="Dinner" onClick={()=>{this.handleCategoryFilters("Dinner")}} />
                  <input className={this.state.categoryFilter === "Dessert" ? "categoryFilterButton active" : "categoryFilterButton"} type="button" value="Dessert" onClick={()=>{this.handleCategoryFilters("Dessert")}} />
                </div>
              </div>
            </div>
            <button className="addRecipeButton" onClick={this.displayBlankCard} >
              New Card
            </button>
          </div>
          {recipes}
          {modal}
        </div>
      </div>
    );
  }
}

export default RecipeContainer;
