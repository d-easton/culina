import React from 'react';
import '../../App.css';
import './Calendar/css/Calendar.css';
import constants from './Calendar/constants.js';
import DroppableButton from './Calendar/model/DroppableButton.js';
import EditableField from './Modal/EditableField';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const axios = require('axios');
// this is an incorrect url, just there to test ^

class CalendarContainer extends React.Component {
    // config
    __mounted = false;

    constructor(props) {
        super(props);

        const draggableInitial = {
            "sundayField" : {
                "elements" : []
            }, 
            "mondayField" : {
                "elements" : []
            }, 
            "tuesdayField" : {
                "elements" : []
            }, 
            "wednesdayField" : {
                "elements" : []
            }, 
            "thursdayField" : {
                "elements" : []
            }, 
            "fridayField" : {
                "elements" : []
            }, 
            "saturdayField" : {
                "elements" : []
            }, 
        };

        this.state = {
            calenderID: 0,
            calendar: "",
            data: {},
            email: props.user.email,
            draggableFields: draggableInitial,
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
        console.log(staticTestData);
        console.log(mode);
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

        } 
        else {
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
        if(5!=9){
            console.log("hi")
        }

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
                                <button class="btn btn-light btn-header">Save</button>
                                <button class="btn btn-light btn-header">Load</button>
                            </div>
                        </div>
                        <div id="calendar-track">
                            <div id="calendar-day-sun" className="calendar-day">
                                <h4 className="card-title">Sunday</h4>
                                <div className="bar sand-dark"></div>
                                <div className="card-recipes">
                                    {/* <DroppableButton droppableId="sunday-field"
                                                elements={this.state.draggableFields.sundayField.elements}
                                                isDisabled={false}  //this.state.isDisabled
                                                updateGlobalListState={this.handleFieldChange}
                                                removeElement={this.handleRemoveElement}
                                                addElement={this.handleAddElement}
                                                listType="ul"
                                                tagType={"p"}
                                            /> */}
                                </div>
                            </div>
                            <div id="calendar-day-mon" className="calendar-day">
                                <h4 className="card-title">Monday</h4>
                                <div className="bar sand-dark"></div>
                                <div className="card-recipes">
                                    {/* <DroppableButton droppableId="monday-field"
                                                        elements={this.state.draggableFields.mondayField.elements}
                                                        isDisabled={false}  //this.state.isDisabled
                                                        updateGlobalListState={this.handleFieldChange}
                                                        removeElement={this.handleRemoveElement}
                                                        addElement={this.handleAddElement}
                                                        listType="ul"
                                                        tagType={"p"}
                                                    /> */}
                                </div>
                            </div>
                            <div id="calendar-day-tue" className="calendar-day">
                                <h4 className="card-title">Tuesday</h4>
                                <div className="bar sand-dark"></div>
                                <div className="card-recipes">
                                    {/* <DroppableButton droppableId="tuesday-field"
                                                        elements={this.state.draggableFields.tuesdayField.elements}
                                                        isDisabled={false}  //this.state.isDisabled
                                                        updateGlobalListState={this.handleFieldChange}
                                                        removeElement={this.handleRemoveElement}
                                                        addElement={this.handleAddElement}
                                                        listType="ul"
                                                        tagType={"p"}
                                                    /> */}
                                </div>
                            </div>
                            <div id="calendar-day-wed" className="calendar-day">
                                <h4 className="card-title">Wednesday</h4>
                                <div className="bar sand-dark"></div>
                                <div className="card-recipes">
                                    {/* <DroppableButton droppableId="wednesday-field"
                                                    elements={this.state.draggableFields.wednesdayField.elements}
                                                    isDisabled={false}  //this.state.isDisabled
                                                    updateGlobalListState={this.handleFieldChange}
                                                    removeElement={this.handleRemoveElement}
                                                    addElement={this.handleAddElement}
                                                    listType="ul"
                                                    tagType={"p"}
                                                /> */}
                                </div>
                            </div>
                            <div id="calendar-day-thu" className="calendar-day">
                                <h4 className="card-title">Thursday</h4>
                                <div className="bar sand-dark"></div>
                                <div className="card-recipes">
                                    {/* <DroppableButton droppableId="thursday-field"
                                                    elements={this.state.draggableFields.thursdayField.elements}
                                                    isDisabled={false}  //this.state.isDisabled
                                                    updateGlobalListState={this.handleFieldChange}
                                                    removeElement={this.handleRemoveElement}
                                                    addElement={this.handleAddElement}
                                                    listType="ul"
                                                    tagType={"p"}
                                                /> */}
                                </div>
                            </div>
                            <div id="calendar-day-fri" className="calendar-day">
                                <h4 className="card-title">Friday</h4>
                                <div className="bar sand-dark"></div>
                                <div className="card-recipes">
                                    {/* <DroppableButton droppableId="friday-field"
                                                        elements={this.state.draggableFields.fridayField.elements}
                                                        isDisabled={false}  //this.state.isDisabled
                                                        updateGlobalListState={this.handleFieldChange}
                                                        removeElement={this.handleRemoveElement}
                                                        addElement={this.handleAddElement}
                                                        listType="ul"
                                                        tagType={"p"}
                                                    /> */}
                                </div>
                            </div>
                            <div id="calendar-day-sat" className="calendar-day">
                                <h4 className="card-title">Saturday</h4>
                                <div className="bar sand-dark"></div>
                                <div className="card-recipes">
                                    {/* <DroppableButton droppableId="saturday-field"
                                        elements={this.state.draggableFields.saturdayField.elements}
                                        isDisabled={false}  //this.state.isDisabled
                                        updateGlobalListState={this.handleFieldChange}
                                        removeElement={this.handleRemoveElement}
                                        addElement={this.handleAddElement}
                                        listType="ul"
                                        tagType={"p"}
                                    /> */}
                                </div>
                            </div>
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
                        <div id="recipe-box">
                            <DroppableButton droppableId="drop-area"
                                elements={recipeElements}
                                isDisabled={false}  //this.state.isDisabled
                                // updateGlobalListState={this.handleFieldChange}
                                // removeElement={this.handleRemoveElement}
                                // addElement={this.handleAddElement}
                                tagType={"p"}
                            />                        
                        </div>
                    </div>
                </div>
            </DragDropContext>
        );
    }
}
export default CalendarContainer;