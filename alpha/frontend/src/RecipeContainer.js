import React from 'react';
import ReactDOM from 'react-dom';
import RecipeCard from './RecipeCard.js';
import RecipeModal from './RecipeModal.js';
const axios = require('axios');
const loadRecipeURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getRecipeForUser";

class RecipeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            showNewCardOption: false,

            modalRecipe: null,
            isNewCard: false,
            defaultRecipe: {
                title: "New Recipe",
                author: "Author",
                ingredients: [],
                steps: []
            },
            recipes: [],
            ocrOutput: null
        }
        
        this.closeModal = this.closeModal.bind(this);
        this.displayModal = this.displayModal.bind(this);
        this.displayBlankCard = this.displayBlankCard.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.setData = this.setData.bind(this);
        this.addNewCardLocally = this.addNewCardLocally.bind(this);
        this.deleteCardLocally = this.deleteCardLocally.bind(this);
        this.updateCardLocally = this.updateCardLocally.bind(this);
        this.displayNewCardPrompt = this.displayNewCardPrompt.bind(this);
        this.displayOCRUploadField = this.displayOCRUploadField.bind(this);
        this.uploadRecipeImage = this.uploadRecipeImage.bind(this);

        this.uploadField = React.createRef();

        //UNDO AFTER SERVER FIXED
        this.fetchData();
    }

    fetchData() {
        axios.post(loadRecipeURL, {
            "Email": "test2@gmail.com",
        },
        ).then(res => {
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

            this.setData(res);
        });
    }

    setData(res) {
        if (res.data == null) {
            this.setState({ recipes: [] });
        } else {
            let ocr = null;
            res.data.forEach((element, index) => {
                if (element.id == "ocrOutput") {
                    ocr = element.output;
                    res.data.splice(index, 1);
                    this.setState({ modalRecipe: this.state.defaultRecipe, isNewCard: true });
                }
            });
            this.setState({ recipes: res.data, ocrOutput: ocr });
        }
    }
    closeModal() {
        this.setState({ showModal: false, ocrOutput: null });
    }

    displayModal(recipeJSON, isNewCard) {
        this.setState({ modalRecipe: recipeJSON, showModal: true , isNewCard: isNewCard});
    }

    displayBlankCard() {
        this.setState({ showNewCardOption: false });
        this.displayModal(this.state.defaultRecipe, true);
    }

    displayNewCardPrompt() {
        /*Display simple pop-up with 3 buttons and prompt
           How would you like to make a new card?
                Manual
                    "Manually type and organize a card"
                    onClick={displayBlankCard}
                Automatic
                    "Upload a photo of a recipe and have Culina take care of most of the typing"
                    onClick={displayOCRUploadField}
                Cancel
        */
        this.setState({ showNewCardOption: true, showModal:false });
    }

    displayOCRUploadField() {
        //Display modal with Upload field and submit button
        //onSubmit={uploadToOCR}
        this.setState({showUploadOption: true, showNewCardOption: false})

    }

    uploadRecipeImage() {
        //Server post of uploaded photo
        //Display buffer until get a response
        console.log(this);
        const node = this.uploadField.current;
        console.log(node.value);
        if (node.value == "") {
            alert("Please Upload an Image");
        } else {
            alert("Uploading image");
            this.setState({ showUploadOption: false, showBuffering: true });

        }

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
        this.setState({ recipes: tempCards });
    }


    render() {
        const renderModal = this.state.showModal || this.state.ocrOutput;

        let recipes = [];
        this.state.recipes.forEach((recipe, index) => {
            recipes.push(<RecipeCard recipe={recipe} key={index} onClick={this.displayModal} modalEnabled={renderModal} />);
        });

        let modal = null;
        let bodyOverflow = "scroll";
        console.log(this.state.ocrOutput);
        bodyOverflow = "hidden";
        console.log(this.state);
        if (this.state.ocrOutput != null || this.state.showModal == true) {
            modal = <RecipeModal key="recipeModal" email={this.props.email}
                onClose={this.closeModal} isNewCard={this.state.isNewCard}
                fetchData={this.fetchData} show={this.state.showModal}
                recipe={this.state.modalRecipe} addLocalCard={this.addNewCardLocally}
                updateLocalCard={this.updateCardLocally} deleteLocalCard={this.deleteCardLocally}
                ocrResults={this.state.ocrOutput} />
        } else if (this.state.showNewCardOption) {
            modal = (
                <div className="grayedBackground">
                    <div className="modal">
                        <div className="newCardOptionsDiv">
                            <h1>How would you like to upload a new card?</h1>
                            <div className="manualOption">
                                <h2>Manual</h2>
                                <p>Manually type and upload a card</p>
                                <button onClick={this.displayBlankCard}>Start Manual Card</button>
                            </div>
                            <div className="automaticOption">
                                <h2>Automatic</h2>
                                <p>Upload a photo of a recipe and have Culina take care of the typing!</p>
                                <button onClick={this.displayOCRUploadField}>Upload Photo</button>
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
                            <input type="file" accept=".jpg, .png" ref={this.uploadField}/>
                            <button onClick={this.uploadRecipeImage}>Upload</button>
                        </div>
                    </div>
                </div>
                );
        }
        

        document.body.style.overflow = modal == null ? "scroll" : "hidden";

        console.log(modal);

        return (
            <div className="recipeContainer">
                <button onClick={this.displayBlankCard}>New Card</button>
                {recipes}
                {modal}
            </div>
        );
        //If ocrResult || showModal  
        //  set show to true
        console.log("Render modal? " + renderModal);
        if (renderModal) {
            document.body.style.overflow = "hidden";
            return (
                <div className="recipeContainer">
                    <button onClick={this.displayBlankCard}>New Card</button>
                    {recipes}
                    {modal}
                </div>
            );
        } else {
            document.body.style.overflow = "scroll";
            return (
                <div className="recipeContainer"> 
                    <button onClick={this.displayNewCardPrompt}>New Card</button>
                    {recipes}
                </div>
            );
        }
    }
}

export default RecipeContainer;