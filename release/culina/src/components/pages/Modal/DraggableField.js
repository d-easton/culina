import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditableRecipeField from './EditableRecipeField.js';
import ImageButton from './ImageButton.js';
import removeImage from './images/close_icon.png';
import dragIcon from './images/drag_icon.png'
import commentIcon from './images/comment_icon.png'
import addIcon from './images/plus_icon.png';
import closeCommentIcon from './images/close_comment_icon.png'
//import EditableField from './EditableField.js'

/* Props:
 *  id: Tracked ID for updating info and for position of Draggable in RecipeModal
 *  tagType: String that is passed to the EditableField. Changes depending on where the element is in RecipeModal
 */
class DraggableField extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showComments: false
        }
        

        this.passOnChange = this.passOnChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.showComments = this.showComments.bind(this);
        this.addComment = this.addComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    //Callback function passed to child EditableField, acts as middle man between EditableField and RecipeModal
    passOnChange(value, index) {
        if (this.props.comments) {
            let content = {text: this.props.html, comments: this.props.comments}
            if (index < 0) {
                console.log("changing content.text")
                content.text = value;
            } else {
                console.log("changing content.comments[" + index + "]")
                content.comments[index] = value;
            }
            this.props.passChangeOn(this.props.id, content);
        } else {
            console.log("changing value")
            this.props.passChangeOn(this.props.id, value);
        }
    }


    //Callback function passed to remove button. Fires callback function from RecipeModal, which removes this Draggable's info from RecipeModal's state then removes itself from the DOM
    handleRemove() {
        this.props.handleRemove(this.props.id);
    }

    showComments() {
        this.setState({showComments: !this.state.showComments})
    }

    addComment() {
        let newContent = { text: this.props.html, comments: this.props.comments }
        newContent.comments.push("New Comment");
        this.props.passChangeOn(this.props.id, newContent);
    }

    deleteComment(index) {
        let newContent = { text: this.props.html, comments: this.props.comments }
        newContent.comments.splice(index, 1);
        this.props.passChangeOn(this.props.id, newContent);
    }



    render() {
        const drag_identifer = "draggableField" + this.props.id;

        let comments = [];
        let commentDiv = null;
        let buttons = [<ImageButton childClass="removeButton" key={"remove" + this.props.id} alt={"remove"} imagePath={removeImage} onPress={this.handleRemove} isHidden={this.props.isDisabled} />]
        if (this.props.comments) {
            if (this.state.showComments) {
                comments = this.props.comments.map((comment, index) =>
                    <div className="comment">
                        <EditableRecipeField
                            className="comment"
                            tagName={"p"}
                            key={"comment-" + this.props.id + "-" + index}
                            childKey={"contentEditable-" + this.props.id + "-" + index}
                            onChange={this.passOnChange}
                            html={comment}
                            commentIndex={index}
                            disabled={this.props.isDisabled}
                        />
                        <ImageButton childClass={"removeButton"} isHidden={this.props.isDisabled} key={"remove-comment" + this.props.id} alt="remove comment" imagePath={removeImage} onPress={() => { this.deleteComment(index) }}/>
                    </div>


                );

                if (comments.length == 0) {
                    comments = <p>No comments made yet, add a new comment with the add button</p>;
                }
                commentDiv = (
                    <div className="commentsDiv" isHidden={!this.state.showComments}>
                        <ImageButton childClass={"addButton"} isHidden={this.props.isDisabled} key={"add-comment" + this.props.id} alt={"add comment"} imagePath={addIcon} onPress={this.addComment} />
                        {comments}
                    </div>
                ); 
            }
            buttons.push(<ImageButton childClass={this.props.isDisabled ? "commentButton" : "commentButton editing"} key={"comment" + this.props.id} alt={"comment"} imagePath = {this.state.showComments ? closeCommentIcon : commentIcon} onPress={this.showComments} />)
        }

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
                        {buttons}
                        {commentDiv}
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
