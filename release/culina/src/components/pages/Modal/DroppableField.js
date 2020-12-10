import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableField from './DraggableField.js';
import ImageButton from './ImageButton.js';
import addImage from './images/plus_icon.png';

class DroppableField extends React.Component {
    constructor(props) {
        super(props);
        this.passChangeOn = this.passChangeOn.bind(this);
        this.passRemoveOn = this.passRemoveOn.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    passChangeOn(elementID, value) {
        //console.log("passing updated value for " + elementID + " in " + this.props.droppableId + "to RecipeModal");
        this.props.updateGlobalListState(this.props.droppableId, elementID, value);
    }

    passRemoveOn(elementID) {
        this.props.removeElement(this.props.droppableId, elementID);
    }

    handleAdd() {
        this.props.addElement(this.props.droppableId);
    }

    render() {

        let draggables = null;

        if (this.props.listType) {
            draggables = this.props.elements.map((elementJSON, index) =>
                <li key={"li"+ elementJSON.id}>
                    <DraggableField
                        id={elementJSON.id}
                        isDisabled={this.props.isDisabled}
                        key={elementJSON.id}
                        index={index}
                        tagType={this.props.tagType}
                        passChangeOn={this.passChangeOn}
                        handleRemove={this.passRemoveOn}
                        html={elementJSON.content.text}
                        comments={elementJSON.content.comments}
                    />
                </li>
            );
        } else {
            draggables = this.props.elements.map((elementJSON, index) =>
                <DraggableField
                    id={elementJSON.id}
                    isDisabled={this.props.isDisabled}
                    key={elementJSON.id}
                    index={index}
                    tagType={this.props.tagType}
                    passChangeOn={this.passChangeOn}
                    handleRemove={this.passRemoveOn}
                    html={elementJSON.content}
                    isDragDisabled={this.props.isDragDisabled}
                />
            );
        }

        if (this.props.listType) {
            if (this.props.listType == "ul") {
                draggables = <ul>
                    {draggables}
                </ul>
            } else {
                draggables = <ol>
                    {draggables}
                    </ol>
            }
        }
        return (
            <Droppable droppableId={this.props.droppableId}>
                {provided => (
                    <div
                        className={this.props.isDisabled || this.props.isDragDisabled ? "droppableField" : "droppableField enabled"}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {draggables}
                        
                        {provided.placeholder}
                        <ImageButton childClass="addButton" key={"add" + this.props.droppableId} alt={"Insert"} imagePath={addImage} onPress={this.handleAdd} id={"add-" + this.props.droppableId}
                            isHidden={this.props.isDisabled || this.props.isDragDisabled} />
                    </div>
                )}
            </Droppable>
            );
    }
}

export default DroppableField;