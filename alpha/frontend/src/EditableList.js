import React from 'react';
import EditableField from './EditableField.js';
import ImageButton from './ImageButton.js';


class EditableList extends React.Component {
    constructor(props) {
        super(props)
        let tempElements = [];      //List elements to be loaded from props
        let elementPositions = [];  //Local tracking of the list order

        //Load elements and their starting positions into local arrays
        this.props.elements.forEach((element, index) => {
            tempElements[index] = element;
            elementPositions[index] = index;
        });

        //Update state
        this.state = {
            elements: tempElements,                 //Array that holds the info for all li elements
            elementPositions: elementPositions,     //Array that stores the positions of all li elmenets 
            id: this.props.id,                      //String with name of the state key in the "global" state that holds the copy of all elements (ex: "ingredients", "steps")          
            isOrdered: this.props.isOrdered         //Boolean that determines if the list is ordered or not 
        }
        this.handleElementChange = this.handleElementChange.bind(this);     //Callback function sent to each editable field, updates the list's local info and passes back info to RecipeModal
        this.handleRemove = this.handleRemove.bind(this);                   //Function fired when the remove button is pressed, deletes the element from the list and updated RecipeModal's info
        this.handleAdd = this.handleAdd.bind(this);                         //Function fired when the add button is pressed, adds a new element to the list and updates RecipeModal's info

        this.listRef = React.createRef();       //Reference to the list element, used to make the list elements draggable with Dragula
    }
    
    componentDidUpdate() {
    }

   
    //Passed to sub-elements, acts as middle man for global data and local state data
    handleElementChange(fieldID, html) {
        let tempElements = this.state.elements;
        tempElements[fieldID] = html;
        this.setState({ elements: tempElements });
        this.props.onChange(this.state.id, tempElements);

    }

    handleRemove(indexToRemove) {
        let tempElements = []
        this.state.elements.forEach((element, index) => {
            if (index !== indexToRemove) {
                tempElements.push(element);
            }
        })

        let tempElementPositions = this.state.elementPositions;
        tempElementPositions.splice(tempElementPositions.indexOf(indexToRemove), 1);

        this.setState({ elements: tempElements, elementPositions: tempElementPositions });
        this.props.onChange(this.state.id, tempElements);
    }

    handleAdd() {
        let tempElements = this.state.elements;
        let tempElementPositions = this.state.elementPositions;
        tempElements.push("New " + this.props.elementName);
        tempElementPositions.push(tempElements.length - 1);
        this.setState({ elements: tempElements, elementPositions: tempElementPositions});
        this.props.onChange(this.state.id, tempElements);
    }

    render() {
        var elementFields = [];
        const classes = (this.props.isDisabled ? "listElementContainer" : "listElementContainer enabled");
        this.state.elements.forEach((element, index) => {
            elementFields.push(
                <div key={index} id={index} className={classes}>
                    <EditableField
                        className="listElement"
                        tagName={"li"}
                        key={"field" + index + element}
                        
                        childKey={"li" + index}
                        id={index}
                        onChange={this.handleElementChange}
                        html={element}
                        disabled={this.props.isDisabled}
                    />
                    <ImageButton className="removeButton" key={"remove" + index} alt={"Remove"} imagePath={"./imgs/close_icon.png"} onPress={this.handleRemove} id={index} isHidden={this.props.isDisabled} />
                </div>
            );
        });

        if (this.props.isOrdered) {
            return (
                <div>
                    <h3 className="listTitle">{this.props.listTitle}<ImageButton className="addButton" alt={"Add"} imagePath={"./imgs/add_icon.png"} onPress={this.handleAdd} isHidden={this.props.isDisabled} /></h3>
                    <ol ref={this.listRef} className="editableList">
                        {elementFields}
                    </ol>
                </div>

            );
        } else {
            return (
                <div>
                    <h3 className="listTitle">{this.props.listTitle}<ImageButton className="addButton" alt={"Add"} imagePath={"imgs/add_icon.png"} onPress={this.handleAdd} isHidden={this.props.isDisabled} /></h3>
                    <ul ref={this.listRef} className="editableList">
                        {elementFields}
                    </ul>
                </div>
            );
        }
    }
}

export default EditableList;
