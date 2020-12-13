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

        // console.log("recipes = ")
        // console.log(constants.data.recipes);
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
        this.exportData = this.exportData.bind(this);

        this.onChange = this.onChange.bind(this);
        this.buildCalendarObj = this.buildCalendarObj.bind(this);
    
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    componentDidMount() {
        this._mounted = true;
        // this.getData(constants.calendarCode);
        // this.getData(constants.recipeCode);
        this.fetchData()
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    fetchData() {
        axios.post(constants.getRecipeURL, {
            "Email": this.state.email,
        },
        ).then(res => {
            this.setData(res.data, constants.recipeCode );
        });
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
                this.setState({ recipeData: staticTestData });    //[]
            } else {

                let recipeDict = {};
                let titles = [];
                res.forEach((element)=>{
                    recipeDict[element.id] = element;
                    titles.push(element.id);
                })
                
                // console.log(this.state);
                const updateRecipeBoxData = this.state.recipeBoxData;
                updateRecipeBoxData.recipeIDs = titles;

                this.setState({ recipes: recipeDict });
                this.setState({ recipeBoxData: updateRecipeBoxData });
            }
        }
        else {
            const err = "Invalid data mode";
            console.log('err', err);
        }
        // console.log(this.state.recipeData);
    }

    exportData () {
        let payload = [];

        this.state.calendarOrder.map(frameID => {
            this.state.frameData[frameID].recipeIDs.map( recipeID => {
                payload.push( this.state.recipes[recipeID] );
            });
        });

        // TODO: export data to grocery list
            // at this point, payload is an array of JSON objects representing all those recipes currently in the calendar cards
            // Recipes in the payload are not associated with days. I can add this information back in in the form of another array, or
            // be restructuring payload to be a day name: recipe info dictionary. Lmk if you want me to do that
        console.log(payload);
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
        const { destination, source, draggableId } = result;
  
        // no valid dest (dropped outside droppable)
        if (!destination) {
            return;
        }
        // no change
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const sourceDropId = source["droppableId"];
        const destDropId = destination["droppableId"];

        // Recipebox internal reorder
        if (sourceDropId == "recipeBox" && destDropId == "recipeBox") {
            const draggedRecipe =  this.state.recipes[this.state.recipeBoxData.recipeIDs[source.index]];

            let updateRecipeBoxData = this.state.recipeBoxData;
            updateRecipeBoxData.recipeIDs.splice(destination.index, 0, updateRecipeBoxData.recipeIDs.splice(source.index, 1)[0]);
            this.setState({recipeBoxData: updateRecipeBoxData}); 
        }

        // move from recipebox to a frame
        else if ( sourceDropId == "recipeBox" && destDropId.includes("cal") ) {

            const draggedRecipe = this.state.recipes[this.state.recipeBoxData.recipeIDs[source.index]];

            // Remove from recipe box
            let updateRecipeBoxData = this.state.recipeBoxData;
            updateRecipeBoxData.recipeIDs.splice(source.index, 1);
            this.setState({recipeBoxData: updateRecipeBoxData});

            // Add to frame
            let updateFrameData = this.state.frameData;
            updateFrameData[destination["droppableId"]].recipeIDs.push(draggedRecipe.id);
            this.setState({frameData: updateFrameData});
        }

        // move from a frame to recipebox
        else if ( sourceDropId.includes("cal") && destDropId == "recipeBox" ) {
            // console.log("frame to box");

            const draggedRecipe = this.state.recipes[this.state.frameData[source.droppableId].recipeIDs[source.index]];

             // remove from frame
            let updateFrameData = this.state.frameData;
            updateFrameData[source["droppableId"]].recipeIDs.splice(source.index, 1);
            this.setState({frameData: updateFrameData});

             // add to recipe box
            let updateRecipeBoxData = this.state.recipeBoxData;
            updateRecipeBoxData.recipeIDs.slice(0, destination.index+1);
            updateRecipeBoxData.recipeIDs.push(draggedRecipe.id);

            this.setState({recipeBoxData: updateRecipeBoxData});
        }

        // frame internal
        else if ( sourceDropId.includes("cal") && destDropId.includes("cal") ) { 
            
            const draggedRecipe = this.state.recipes[this.state.frameData[source.droppableId].recipeIDs[source.index]];

            // remove from current frame
            let updateFrameData = this.state.frameData;
            updateFrameData[source["droppableId"]].recipeIDs.splice(source.index, 1);
            updateFrameData[destination["droppableId"]].recipeIDs.push(draggedRecipe.id);
            this.setState({frameData: updateFrameData});
        }
    }

    render() {

        let recipeElements = constants.data;

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
                                <button className="btn btn-light btn-header" onClick={this.exportData}>Export</button>
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
                            recipes= {this.state.recipeBoxData.recipeIDs.map( recipeID => this.state.recipes[recipeID])}  //{Object.values(this.state.recipes)}
                            isDisabled={this.isDisbaled}
                        ></RecipeBox>
                    </div>
                </div>
            </DragDropContext>
        );
    }
}
export default CalendarContainer;