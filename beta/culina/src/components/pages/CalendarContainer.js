import React from 'react';
import '../../App.css';
import './Calendar/css/Calendar.css';
import constants from './Calendar/constants.js';
// import DroppableArea from './Calendar/model/DroppableArea.js';
import EditableField from './Modal/EditableField';

import Frame from './Calendar/model/Frame.jsx';
import RecipeBox from './Calendar/model/RecipeBox.jsx';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const axios = require('axios');
// this is an incorrect url, just there to test ^

class CalendarContainer extends React.Component {
    // config
    __mounted = false;

    constructor(props) {
        super(props);

        // const draggableInitial = {
        //     "sundayField" : {
        //         "elements" : []
        //     }, 
        //     "mondayField" : {
        //         "elements" : []
        //     }, 
        //     "tuesdayField" : {
        //         "elements" : []
        //     }, 
        //     "wednesdayField" : {
        //         "elements" : []
        //     }, 
        //     "thursdayField" : {
        //         "elements" : []
        //     }, 
        //     "fridayField" : {
        //         "elements" : []
        //     }, 
        //     "saturdayField" : {
        //         "elements" : []
        //     }, 
        // };

        console.log("recipes = ")
        console.log(constants.data.recipes);
        this.state = {
            // calenderID: 0,
            // calendar: "",
            // data: {},
            email: props.user.email,
            // draggableFields: draggableInitial,
            // isDisabled: false,

            recipes: constants.data.recipes,
            calendarOrder: constants.data.calendarOrder,
            recipeBoxData: constants.data.recipeBox,
            frameData: constants.data.calendarFrames
        }

        // this.config = this.config.bind(this);

        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.buildCalendarObj = this.buildCalendarObj.bind(this);
    
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    componentDidMount() {
        this._mounted = true;
        // this.getData(constants.calendarCode);
        this.getData(constants.recipeCode);
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    getData(mode) {
        let header = {
            "email": this.state.email
        };
        let url;
        const CALENDAR = constants.calendarCode;
        const RECIPE = constants.recipeCode;

        if (mode == CALENDAR) {
            // any necessary header modifications
            url = constants.getCalendarURL;
        }
        else if (mode == RECIPE) {
            // any necessary header modifications
            url = constants.getRecipeURL;
        }
        else {
            const err = "Invalid data mode";
            console.log('err', err);
            return
        }


        axios.post(url, header)
            .then(response => {
                if(this._mounted) {
                    if(mode == CALENDAR) {
                        this.setData(response.data[0].ingredients, CALENDAR);
                    }
                    else if (mode == RECIPE) {
                        this.setData(response.data[0].ingredients, RECIPE); // TODO: fix this format
                    }
                }
            })
            .catch(err => 
                axios.put(url, header)
                .then(response => {
                    if(this._mounted) {
                        if(mode == CALENDAR) {
                            this.setData(response.data[0].ingredients, CALENDAR);
                        }
                        else if (mode == RECIPE) {
                            this.setData(response.data[0].ingredients, RECIPE); // TODO: fix this format
                        }
                    }
                })
                .catch(err => {
                    // if(this.__mounted) {
                    if (mode == CALENDAR){
                        this.setData(null, CALENDAR);
                    }
                    else if (mode == RECIPE) {
                        this.setData(null, RECIPE);
                    }
                    // }
                    console.log('err', err);
                }))
    }
    
    setData(res, mode) {
        const CALENDAR = constants.calendarCode;
        const RECIPE = constants.recipeCode;
        const staticTestData = constants.data;
        if (mode == CALENDAR) {
            if (res == null) {
                this.setState({ calendarData: [] });
            } else {
                this.setState({ calendarData: res});
            }
        }
        else if (mode == RECIPE) {
            if (res == null) {
                // this.setState({ recipeData: staticTestData });    //[]
            } else {
                this.setState({ recipeData: res});
            }
        }
        else {
            const err = "Invalid data mode";
            console.log('err', err);
        }
        // console.log(this.state.recipeData);
    }

    onChange(id, newTitle) {
        console.log("id: " +id+ "  title changing to: "+newTitle);
        this.setState({
            calendarTitle: newTitle
        })
    }

    buildCalendarObj() {
        console.log(this.state.calenderData);
        return {
            "id": this.state.calenderID,
            "title": this.state.calendarTitle,
            "data": this.state.calendarData
        }
    }

    /** DND FUNCTIONS */

    //Passed to DragDropContext to handle drag ends
    handleDragEnd = result => {
        console.log(result);
        const { destination, source, draggableId } = result;
        //console.log("draggableID = ") 
        //console.log(draggableId)

        console.log(destination);
        // no valid dest (dropped outside droppable)
        if (!destination) {
            console.log("return on invalid")
            return;
        }
        // no change
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            console.log("return on mismatch")
            return;
        }

        console.log(destination);
        // let mode;
        let start;
        let finish;
        // console.log(source);
        // console.log(destination.droppableId);
        if (source.droppableId == "recipeBox") {
            start = this.state.recipeBoxData.recipeIDs[source.index];
        }
        else {
            start = this.state.frameData.recipeIDs[source.index];
        }
        console.log(destination);
        if (destination.droppableId == "recipeBox") {
            finish = this.state.recipeBoxData.recipeIDs[destination.index];
        }
        else {
            finish = this.state.frameData.recipeIDs[destination.index];
            
        }
        // console.log(start)
        // console.log(finish)
        // console.log(draggableId);
        

        // Recipebox to a calendar frame
        console.log(destination);
        // Recipebox internal reorder
        if (source.droppableId == "recipeBox" && destination.droppableId == "recipeBox") {
            /*
            const recipeBox = this.state.recipeBoxData;
            const updatedRecipeIDs = Array.from(recipeBox.recipeIDs);
            updatedRecipeIDs.splice(source.index, 1);
            updatedRecipeIDs.splice(destination.index, 0, draggableId);

            const updateRecipeBox = {
                ...recipeBox,
                recipeIDs: updatedRecipeIDs,
            };
            const updateState = {
                ...this.state,
                recipeBoxData: updateRecipeBox
            }
            */
            // console.log(updateState);
            // console.log(source.index);
            // console.log(destination.index);
            //console.log("updatedState = ")
            //console.log(updateState)

            //this.setState(updateState);
            let tempRecipes = this.state.recipes;
            console.log("tempRecipes before swap")
            console.log(tempRecipes)
            const draggedRecipe = tempRecipes.splice(source.index, 1)[0]
            tempRecipes.splice(destination.index, 0, draggedRecipe);
            console.log("tempRecipes after swap")
            console.log(tempRecipes);

        }
        else if (source.droppableId == "recipeBox" && (destination.droppableId.toLowercase()).includes("cal")) {
            console.log("kkkk");
        }
    }

    // handleDragEnd(result) {
    //     const { source, destination } = result;

    //     // dropped outside the list
    //     if (!destination) {
    //         console.log("element not dropped in any droppables, returning to original position");
    //         return;
    //     }

    //     let tempDraggableFields = this.state.draggableFields;

    //     //Dropped into the same list
    //     if (source.droppableId === destination.droppableId) {
    //         //Item dropped back into same list, reorder list
    //         let fieldList = tempDraggableFields[destination.droppableId];
    //         const movedItem = fieldList.elements.splice(source.index, 1)[0]

    //         fieldList.elements.splice(destination.index, 0, movedItem);

    //         tempDraggableFields[destination.droppableId] = fieldList;

    //         this.setState({ draggableFields: tempDraggableFields });

    //     } 
    //     else {
    //         //Field dragging into is full
    //         if (tempDraggableFields[destination.droppableId].elementLimit <= tempDraggableFields[destination.droppableId].elements.length) {
    //             alert("This field is full");
    //             return;
    //         }
    //         //Element dropped into new list, remove from source and add to destination
    //         let destinationFieldList = tempDraggableFields[destination.droppableId];
    //         let sourceFieldList = tempDraggableFields[source.droppableId];

    //         const movedItem = sourceFieldList.elements.splice(source.index, 1)[0];

    //         destinationFieldList.elements.splice(destination.index, 0, movedItem);

    //         tempDraggableFields[destination.droppableId] = destinationFieldList;
    //         tempDraggableFields[source.droppableId] = sourceFieldList;

    //         this.setState({ draggableFields: tempDraggableFields });
    //     }
    // }

    render() {

        // let recipeElements = [];
        // const recipeCardClass = "recipe-cards";
        // if (this.state.recipeData != null) {
        //     this.state.recipeData.forEach((element, index) => {
        //         console.log(element.header["title"]);
        //         recipeElements.push(
        //             // <div key={element.header.id} className={recipeCardClass}>
        //                 <button class="btn btn-info recipe-card">{element.header["title"]}</button>
        //             // </div>
        //         );
        //     });
        // }

        let recipeElements = constants.data;

        //onDragEnd={this.handleDragEnd}
        return (
            <DragDropContext onDragEnd={this.handleDragEnd}>
                <div id="calendar-wrapper" className="grey">
                    <div id="calendar-div" className="blue-dark">
                        <div id="calendar-header"> 
                            <div id="calendar-title">
                                <EditableField
                                    id={this.state.calenderID}
                                    onChange={this.handleChange}
                                    html={""}
                                    tagName={"h2"}
                                    disabled={false}      //{this.state.isDisabled}
                                    onChange={this.onChange}
                                    style = {{
                                        'color': '#F4E3D7',
                                        'width': '700px',
                                    }}
                                />
                            </div>
                            <div>
                                <button className="btn btn-light btn-header">Save</button>
                                <button className="btn btn-light btn-header">Load</button>
                            </div>
                        </div>
                        <div id="calendar-track">
                            {this.state.calendarOrder.map(frameID => {
                                const frame = this.state.frameData[frameID];
                                const recipes = frame.recipeIDs.map( recipeID => this.state.recipes[recipeID] );
                                return <Frame key={frame.id} frame={frame} recipes={recipes}></Frame>
                            })}
                        </div>
                    </div>
                    <div id="recipes-div" className="sand-dark">
                        <div id="divider-wrapper">
                            <div id="divider-left" className="sand-mid"/>    
                            <div id="divider-middle" className="blue-dark"/>
                            <div id="divider-right" className="sand-mid"/>
                        </div>
                        <div id="recipes-header"> 
                            <h2>Recipes</h2>
                        </div>
                        <RecipeBox
                            key="recipeBox"
                            recipes={this.state.recipes}
                            isDisabled={this.isDisbaled}
                        ></RecipeBox>
                    </div>
                </div>
            </DragDropContext>
        );
    }
}
export default CalendarContainer;