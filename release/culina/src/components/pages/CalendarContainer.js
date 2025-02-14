import React from "react";
import * as bs from "react-bootstrap";
import "../../App.css";
import "./Calendar/css/Calendar.css";
import constants from "./Calendar/constants.js";
import funcs from "./Calendar/funcs.js";
import EditableField from "./Modal/EditableField";
import Dashboard from "./Calendar/model/Dashboard.jsx";

import CalendarTrack from "./Calendar/model/CalendarTrack.jsx"
import RecipeBox from "./Calendar/model/RecipeBox.jsx";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const axios = require("axios");
const updateGroceryListURL =
    "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/updateGroceryList";
const getGroceryListURL =
    "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getGroceryList";

const getMealPlanURL =
    "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getMealPlan";
const addMealPlanURL =
    "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/addMealPlan";
const deleteMealPlanURL =
    "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/deleteMealPlan";
const updateMealPlanURL =
    "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/updateMealPlan";

const getRecipeURL =
    "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getRecipeForUser";

function Modal(props) {
    let ingridients = [];
    for (let i = 0; i < props.recipe.ingredients.length; i++) {
        ingridients.push(props.recipe.ingredients[i].text);
        ingridients.push(<br></br>);
    }
    let steps = [];
    for (let i = 0; i < props.recipe.steps.length; i++) {
        steps.push(props.recipe.steps[i].text);
        steps.push(<br></br>);
    }

    return (
        <bs.Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <bs.Modal.Header>
                <bs.Modal.Title id="contained-modal-title-vcenter">
                    {props.recipe.title}
                    <br></br>
                    {props.recipe.author}
                </bs.Modal.Title>
            </bs.Modal.Header>

            <bs.Modal.Body>
                <img className="modal_pic" alt="Food Image" src={props.recipe.image} />
                <br></br> <br></br>
                <p>{props.recipe.description}</p>
                <br></br>
                <h4>Ingredients</h4>
                <p>{ingridients}</p>
                <br></br>
                <h4>Steps</h4>
                <p>{steps}</p>
                <br></br>
            </bs.Modal.Body>

            <bs.Modal.Footer>
                <bs.Button
                    className="closeModal"
                    variant="secondary"
                    onClick={props.onHide}
                >
                    Close
        </bs.Button>
            </bs.Modal.Footer>
        </bs.Modal>
    );
}

class CalendarContainer extends React.Component {
    // config
    __mounted = false;

    constructor(props) {
        super(props);

        this.state = {
            email: props.user.email,
            wasRecipeClicked: false,
            selectedRecipe: null,
            showRecipeModal: false,
            recipes: constants.data.recipes,
            calendarOrder: constants.data.calendarOrder,
            recipeBoxData: constants.data.recipeBox,
            frameData: constants.data.calendarFrames,

            fetchedMealPlans:  []
        };

        this.setData = this.setData.bind(this);
        this.exportData = this.exportData.bind(this);

        this.fetchData = this.fetchData.bind(this);
        this.fetchMealPlans = this.fetchMealPlans.bind(this);

        this.onTitleChange = this.onTitleChange.bind(this);
        this.buildCalendarObj = this.buildCalendarObj.bind(this);
        this.onPlanOpen = this.onPlanOpen.bind(this);
        this.onPlanDelete = this.onPlanDelete.bind(this);

        this.closeViewDashboard = this.closeViewDashboard.bind(this);
        this.openViewDashboard = this.openViewDashboard.bind(this);

        this.onRecipeClick = this.onRecipeClick.bind(this);

        this.handleSave = this.handleSave.bind(this);
        this.handleLoad = this.handleLoad.bind(this);

        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    componentDidMount() {
        this._mounted = true;
        this.fetchData();
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    fetchData() {
        // get recipes
        
        console.log("CALL6");
        axios
            .post(constants.getRecipeURL, {
                Email: this.state.email,
            })
            .then((res) => {
                this.setData(res.data, constants.recipeCode);
            });
            
        this.fetchMealPlans();
    }

    fetchMealPlans() {
        const userData = {
            email: this.state.email,
        };

        //get all mealplans
        let mealPlans = [];
        axios
            .post(getMealPlanURL, userData)
            .then((response) => {
                mealPlans = response.data;
                if (mealPlans == undefined || mealPlans == null) {
                   mealPlans = [];
                }
                this.setState({ fetchedMealPlans: mealPlans });
            })
            .catch((err) => console.log("err", err));
    }

    setData(res, mode) {
        const CALENDAR = constants.calendarCode;
        const RECIPE = constants.recipeCode;
        const staticTestData = constants.data;
        if (mode == CALENDAR) {
            if (res == null) {
                this.setState({ calendarData: [] });
            } else {
                this.setState({ calendarData: res });
            }
        } else if (mode == RECIPE) {
            if (res == null) {
                this.setState({ recipeData: staticTestData }); 
            } else {
                let recipeDict = {};
                let titles = [];
                res.forEach((element) => {
                    recipeDict[element.id] = element;
                    titles.push(element.id);
                });

                const updateRecipeBoxData = this.state.recipeBoxData;
                updateRecipeBoxData.recipeIDs = titles;

                this.setState({ recipes: recipeDict });
                this.setState({ recipeBoxData: updateRecipeBoxData });
            }
        } else {
            const err = "Invalid data mode";
            console.log("err", err);
        }
    }

    exportData() {
        let payload = [];
        let ingredients = [];

        //gets all the ingredients from calendar and pushes onto payload array
        this.state.calendarOrder.map((frameID) => {
            this.state.frameData[frameID].recipeIDs.map((recipeID) => {
                if(this.state.recipes[recipeID] != undefined) {
                    payload.push(this.state.recipes[recipeID]);
                }
            });
        });

        if (payload.length == 0) {
            alert(
                "It looks like your calendar is currently empty. Add some recipes to the calendar before you export to the Grocery List."
            );
            return;
        }

        //gets all the current items on the list through user's email
        //pushes onto ingredients array
        const getL = {
            email: this.state.email,
        };
        
        console.log("CALL2");
        axios
            .post(getGroceryListURL, getL)
            .then((response) => {
                console.log(response.data[0].ingredients);
                if (this._mounted) {
                    this.setData(
                        response.data[0].ingredients.forEach((element) => {
                            ingredients.push(element);
                        })
                    );
                    //Once current list is mounted, push new ingredients from calendar
                    //onto ingredients array
                    payload.forEach((element) => {
                        console.log(element.ingredients);
                        element.ingredients.forEach((element) => {
                            ingredients.push(element.text);
                        });
                    });
                    //update grocery list with new ingredients array
                    const savedList = {
                        id: 0,
                        email: this.state.email,
                        ingredients: ingredients,
                    };
                    this.setState({ isDisabled: true });
                    axios
                        .put(updateGroceryListURL, savedList)
                        .catch((err) => console.log("err", err));
                    alert(
                        "Grocery List updated with the ingredients you'll need for this week."
                    );
                }
            })
            .catch((err) => {
                payload.forEach((element) => {
                    ingredients.push(element);
                });
                const savedList = {
                    id: 0,
                    email: this.state.email,
                    ingredients: ingredients,
                };
                axios
                    .put(updateGroceryListURL, savedList)
                    .catch((err) => console.log("err", err));
            });
    }

    onTitleChange() {
        this.setState({
            calendarTitle: document.getElementById("calendar-id").innerHTML,
        });
    }

    buildCalendarObj() {
        console.log(this.state.calenderData);
        return {
            id: this.state.calenderID,
            title: this.state.calendarTitle,
            data: this.state.calendarData,
        };
    }

    closeViewDashboard() {
        document.getElementById("view-dashboard").style.visibility = "hidden";
    }
    openViewDashboard() {
        this.fetchMealPlans();
        document.getElementById("view-dashboard").style.visibility = "visible";
    }

    onRecipeClick(recipeJSON) {
    
        let wasClicked = this.state.wasRecipeClicked;
        let selectedRecipe = this.state.selectedRecipe;
        let showRecipeModal = this.state.showRecipeModal;
        if (!wasClicked) {
            wasClicked = true;
            selectedRecipe = recipeJSON;
        } else if (selectedRecipe != recipeJSON) {
            selectedRecipe = recipeJSON;
        } else {
            showRecipeModal = true;
        }
        this.setState({
            wasRecipeClicked: wasClicked,
            selectedRecipe: selectedRecipe,
            showRecipeModal: showRecipeModal,
        });
    }

    onPlanOpen(plan) {
        if (!(funcs.getMealPlanTitles(this.state.fetchedMealPlans).includes(plan.name))) {
            alert("We had trouble opening that calendar right now. Please try again later.")
            this.setState({
                calendarTitle: "Enter title"
            });
            document.getElementById("calendar-id").innerHTML = "Enter title";
        }

        let updateFrameData = this.state.frameData;
        updateFrameData["calMon"].recipeIDs = plan.monday;
        updateFrameData["calTue"].recipeIDs = plan.tuesday;
        updateFrameData["calWed"].recipeIDs = plan.wednesday;
        updateFrameData["calThu"].recipeIDs = plan.thursday;
        updateFrameData["calFri"].recipeIDs = plan.friday;
        updateFrameData["calSat"].recipeIDs = plan.saturday;
        updateFrameData["calSun"].recipeIDs = plan.sunday;
        this.setState({
            frameData: updateFrameData
        });
    }
    onPlanDelete(plan) {
        //delete
        axios
            .put(deleteMealPlanURL, plan)
            .then((response) => {
                this.fetchMealPlans();
                console.log(this.state.fetchedMealPlans);
            })
            .catch((err) => console.log("err", err));
    }

    handleSave = () => {

        if (this.state.calendarTitle == "" || this.state.calendarTitle == undefined || this.state.calendarTitle == "Enter title"){
            alert("Please give your calendar a title and try again.");

            return;
        } 

        const payload = {
            name: this.state.calendarTitle,
            id: funcs.getCalendarIDFromTitle(this.state.fetchedMealPlans, this.state.calendarTitle),
            email: this.state.email,
            monday: this.state.frameData["calMon"].recipeIDs,
            tuesday: this.state.frameData["calTue"].recipeIDs,
            wednesday: this.state.frameData["calWed"].recipeIDs,
            thursday: this.state.frameData["calThu"].recipeIDs,
            friday: this.state.frameData["calFri"].recipeIDs,
            saturday: this.state.frameData["calSat"].recipeIDs,
            sunday: this.state.frameData["calSun"].recipeIDs,
        };
        
        // ready for store
        if (funcs.getMealPlanTitles(this.state.fetchedMealPlans).includes(this.state.calendarTitle)) {
            
            //update
            axios
                .put(updateMealPlanURL, payload)
                .then((response) => {
                    alert("Your calendar, "+this.state.calendarTitle+", was successfully updated.");
                    this.fetchMealPlans();
                })
                .catch((err) => console.log("err", err));
        }
        else {
            // add
            axios
                .post(addMealPlanURL, payload)
                .then((response) => {
                    alert("Your calendar, "+this.state.calendarTitle+", was successfully saved.");
                    this.fetchMealPlans();
                })
                .catch((err) => console.log("err", err));
        }
    };

    handleLoad = () => {
        this.openViewDashboard();
    };

    mealPlanMethods() {
        // Meal Plan methods

        const data = {
            title: this.state.calendarTitle,
            id: 1,
            email: this.state.email,
            monday: this.state.frameData["calMon"].recipeIDs,
            tuesday: this.state.frameData["calTue"].recipeIDs,
            wednesday: this.state.frameData["calWed"].recipeIDs,
            thursday: this.state.frameData["calThu"].recipeIDs,
            friday: this.state.frameData["calFri"].recipeIDs,
            saturday: this.state.frameData["calSat"].recipeIDs,
            sunday: this.state.frameData["calSun"].recipeIDs,
        };

        const userData = {
            email: this.state.email,
        };
        
    }

    /** DND FUNCTIONS */

    //Passed to DragDropContext to handle drag ends
    handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // no valid dest (dropped outside droppable)
        if (!destination) {
            return;
        }
        // no change
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourceDropId = source["droppableId"];
        const destDropId = destination["droppableId"];

        // Recipebox internal reorder
        if (sourceDropId == "recipeBox" && destDropId == "recipeBox") {
            const draggedRecipe = this.state.recipes[
                this.state.recipeBoxData.recipeIDs[source.index]
            ];

            let updateRecipeBoxData = this.state.recipeBoxData;
            updateRecipeBoxData.recipeIDs.splice(
                destination.index,
                0,
                updateRecipeBoxData.recipeIDs.splice(source.index, 1)[0]
            );
            this.setState({ recipeBoxData: updateRecipeBoxData });
        }

        // move from recipebox to a frame
        else if (sourceDropId == "recipeBox" && destDropId.includes("cal")) {
            const draggedRecipe = this.state.recipes[
                this.state.recipeBoxData.recipeIDs[source.index]
            ];

            // Remove from recipe box
            let updateRecipeBoxData = this.state.recipeBoxData;
            updateRecipeBoxData.recipeIDs.splice(source.index, 1);
            this.setState({ recipeBoxData: updateRecipeBoxData });

            // Add to frame
            let updateFrameData = this.state.frameData;
            updateFrameData[destination["droppableId"]].recipeIDs.push(
                draggedRecipe.id
            );
            this.setState({ frameData: updateFrameData });
        }

        // move from a frame to recipebox
        else if (sourceDropId.includes("cal") && destDropId == "recipeBox") {
            // console.log("frame to box");

            const draggedRecipe = this.state.recipes[
                this.state.frameData[source.droppableId].recipeIDs[source.index]
            ];

            // remove from frame
            let updateFrameData = this.state.frameData;
            updateFrameData[source["droppableId"]].recipeIDs.splice(source.index, 1);
            this.setState({ frameData: updateFrameData });

            // add to recipe box
            let updateRecipeBoxData = this.state.recipeBoxData;
            updateRecipeBoxData.recipeIDs.slice(0, destination.index + 1);
            updateRecipeBoxData.recipeIDs.push(draggedRecipe.id);

            this.setState({ recipeBoxData: updateRecipeBoxData });
        }

        // frame internal
        else if (sourceDropId.includes("cal") && destDropId.includes("cal")) {
            const draggedRecipe = this.state.recipes[
                this.state.frameData[source.droppableId].recipeIDs[source.index]
            ];

            // remove from current frame
            let updateFrameData = this.state.frameData;
            updateFrameData[source["droppableId"]].recipeIDs.splice(source.index, 1);
            updateFrameData[destination["droppableId"]].recipeIDs.push(
                draggedRecipe.id
            );
            this.setState({ frameData: updateFrameData });
        }
    };

    render() {
        let recipeElements = constants.data;

        const recipeModal = !this.state.showRecipeModal ? null : (
            <Modal
                recipe={this.state.selectedRecipe}
                user={this.props.user}
                show={this.state.selectedRecipe != null}
                onHide={() =>
                    this.setState({
                        selectedRecipe: null,
                        showRecipeModal: false,
                        wasRecipeClicked: false,
                    })
                }
            />
        );

        let mealPlans = [];
        if (this.state.fetchedMealPlans != undefined || this.state.fetchedMealPlans != null) {
            mealPlans = this.state.fetchedMealPlans;
        }

        return (
            <DragDropContext onDragEnd={this.handleDragEnd}>
                {recipeModal}
                <div id="calendar-wrapper" className="grey">
                    <div id="calendar-div" className="blue-dark">
                        <div id="calendar-header">
                            <div id="view-dashboard">
                                <h4 id="dashboard-title">Your Meal Plans</h4>
                                <button class="clean-button dashboard-close" onClick={this.closeViewDashboard}>x</button>
                                <Dashboard
                                    mealPlans = {mealPlans}  //.map( recipeID => this.state.recipes[recipeID])
                                    openPlanCallback={this.onPlanOpen}
                                    deletePlanCallback={this.onPlanDelete}
                                ></Dashboard>
                            </div>
                            <div id="calendar-title">
                                <EditableField
                                    id={"calendar-id"}
                                    html={"Enter title"}
                                    tagName={"h2"}
                                    disabled={false} //{this.state.isDisabled}
                                    onChange={this.onTitleChange}
                                    style={{
                                        color: "#F4E3D7",
                                        width: "700px",
                                    }}
                                />
                            </div>
                            <div>
                                <button
                                    className="btn btn-light btn-header"
                                    onClick={this.handleSave}
                                >
                                    Save
                                </button>
                                <button
                                    className="btn btn-light btn-header"
                                    onClick={this.handleLoad}
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-light btn-header"
                                    onClick={this.exportData}
                                >
                                    Export
                                </button>
                            </div>
                        </div>
                        <CalendarTrack
                            calendarOrder={this.state.calendarOrder}
                            recipes={this.state.recipes}
                            frameData={this.state.frameData}
                            onRecipeClick={this.onRecipeClick}
                        >
                        </CalendarTrack>
                        
                    </div>
                    <div id="recipes-div" className="sand-dark">
                        <div id="divider-wrapper">
                            <div id="divider-left" className="sand-mid" />
                            <div id="divider-middle" className="blue-dark" />
                            <div id="divider-right" className="sand-mid" />
                        </div>
                        <div id="recipes-header">
                            <h2>Recipes</h2>
                        </div>
                        <RecipeBox
                            key="recipeBox"
                            recipes={this.state.recipeBoxData.recipeIDs.map(
                                (recipeID) => this.state.recipes[recipeID]
                            )}
                            isDisabled={this.isDisbaled}
                            recipeClickCallback={this.onRecipeClick}
                        ></RecipeBox>
                    </div>
                </div>
            </DragDropContext>
        );
    }
}
export default CalendarContainer;