import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableButton from './DraggableButton.js';

class DroppableArea extends React.Component {
    constructor(props) {
        super(props);
        // this.passChangeOn = this.passChangeOn.bind(this);
        // this.passRemoveOn = this.passRemoveOn.bind(this);
        // this.handleAdd = this.handleAdd.bind(this);
    }

    // passChangeOn(elementID, value) {
    //     //console.log("passing updated value for " + elementID + " in " + this.props.droppableId + "to RecipeModal");
    //     this.props.updateGlobalListState(this.props.droppableId, elementID, value);
    // }

    // passRemoveOn(elementID) {
    //     this.props.removeElement(this.props.droppableId, elementID);
    // }

    // handleAdd() {
    //     this.props.addElement(this.props.droppableId);
    // }

    render() {

        let draggables = null;
       
        // console.log(this.props.elements);
        draggables = this.props.elements.map((elementJSON, index) => {
                return <DraggableButton 
                    key={elementJSON.header.id}
                    // element={elementJSON}
                    // id={elementJSON.header.id}
                    isDisabled={this.props.isDisabled}
                    index={index}
                //         // tagType={this.props.tagType}
                //         // passChangeOn={this.passChangeOn}
                //         // handleRemove={this.passRemoveOn}
                    html={elementJSON.header.title}
                />
        });
        console.log(draggables);
        return (
            <Droppable droppableId={this.props.droppableId}>
                {provided => (
                    <div
                    //     className={this.props.isDisabled ? "DroppableArea" : "DroppableArea enabled"}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {draggables}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            );
    }
}

export default DroppableArea;