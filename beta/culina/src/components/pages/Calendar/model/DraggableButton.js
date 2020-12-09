import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
/* Props:
 *  id: Tracked ID for updating info and for position of Draggable in Calendar
 *  tagType: String that is passed to the EditableField. Changes depending on where the element is in RecipeModal
 */
class DraggableButton extends React.Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            //May need to store HTML here in case it is messed up by editing in EditableField
            //For now, just passing between RecipeModal and EditableField as props
        }
        */

        // this.passOnChange = this.passOnChange.bind(this);
        // this.handleRemove = this.handleRemove.bind(this);
    }

    // //Callback function passed to child EditableField, acts as middle man between EditableField and RecipeModal
    // passOnChange(value) {
    //     this.props.passChangeOn(this.props.id, value);
    // }

    //Callback function passed to remove button. Fires callback function from RecipeModal, which removes this Draggable's info from RecipeModal's state then removes itself from the DOM
    // handleRemove() {
    //     this.props.handleRemove(this.props.id);
    // }

    render() {
        const drag_identifer = "draggableField" + this.props.id;
        const recipeCardClass = "recipe-cards";
        console.log(this.props);
        return (
            <Draggable draggableId={drag_identifer} index={this.props.index} isDragDisabled={this.props.isDisabled}>
                { provided => (
                    <div className={recipeCardClass} 
                        key={drag_identifer} 
                        id={this.props.id}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {<button class="btn btn-info recipe-card">{this.props.html}</button>}
                    </div>
                )}
            </Draggable>
        );
    }

    componentWillUnmount() {
    }
}


export default DraggableButton;
