import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditableRecipeField from './EditableRecipeField.js';
import ImageButton from './ImageButton.js';
import removeImage from './images/close_icon.png';
import dragIcon from './images/drag_icon.png'
//import EditableField from './EditableField.js'

/* Props:
 *  id: Tracked ID for updating info and for position of Draggable in RecipeModal
 *  tagType: String that is passed to the EditableField. Changes depending on where the element is in RecipeModal
 */
class DraggableField extends React.Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            //May need to store HTML here in case it is messed up by editing in EditableField
            //For now, just passing between RecipeModal and EditableField as props
        }
        */

        this.passOnChange = this.passOnChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    //Callback function passed to child EditableField, acts as middle man between EditableField and RecipeModal
    passOnChange(value) {
        this.props.passChangeOn(this.props.id, value);
    }

    //Callback function passed to remove button. Fires callback function from RecipeModal, which removes this Draggable's info from RecipeModal's state then removes itself from the DOM
    handleRemove() {
        this.props.handleRemove(this.props.id);
    }



    render() {
        const drag_identifer = "draggableField" + this.props.id;
        return (
            <Draggable draggableId={drag_identifer} index={this.props.index} isDragDisabled={this.props.isDisabled}>
                {provided => (
                    <div className={this.props.isDisabled ? "draggableField" : "draggableField enabled"} key={drag_identifer} id={this.props.id}
                    { ...provided.draggableProps }
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    >
                        <img className="dragIcon" src={dragIcon} alt="Move" hidden={this.props.isDisabled} {...provided.dragHandleProps}/>
                        <EditableRecipeField
                            className="listElement"
                            tagName={this.props.tagType}
                            key={"editableField"+this.props.id}
                            childKey={"contentEditable" + this.props.id}
                            id={this.props.id}
                            onChange={this.passOnChange}
                            html={this.props.html}
                            disabled={this.props.isDisabled}
                        />
                    <ImageButton childClass="removeButton" key={"remove" + this.props.id} alt={"remove"} imagePath={removeImage} onPress={this.handleRemove} isHidden={this.props.isDisabled} />
                </div>
                )}
            </Draggable>
            );
        //C: \Users\eth12\source\repos\culina\alpha\frontend\src\imgs\close_icon.png
    }

    componentWillUnmount() {
    }
}


export default DraggableField;
