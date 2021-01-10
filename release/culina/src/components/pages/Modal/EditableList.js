import React from 'react';
import EditableField from './EditableField.js';
import ImageButton from './ImageButton.js';
import add from '../css/imgs/add.png';
import rm from '../css/imgs/remove.png';


class EditableList extends React.Component {
    constructor(props) {
        super(props)
        let tempElements = [];
        this.props.elements.forEach((element, index) => {
            tempElements[index] = element;
        });
        this.state = {
            elements: tempElements,    //Array that holds the info for all li elements
            id: this.props.id,         //String with name of the state key in the "global" state that holds the copy of all elements (ex: "ingredients", "steps")          
            isDisabled: true,
            isOrdered: this.props.isOrdered
        }
        this.handleElementChange = this.handleElementChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
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
        this.setState({ elements: tempElements });
        this.props.onChange(this.state.id, tempElements);
    }

    handleAdd() {
        let tempElements = this.state.elements;
        tempElements.push("");
        this.setState({ elements: tempElements });
        this.props.onChange(this.state.id, tempElements);
    }

    //Want a + button next to the list header when in edit mode
    //Hitting enter creates a new li element
    //X button at end of li element that allows the element to be deleted entirely 
    render() {
        var elementFields = [];
        const classes = (this.props.isDisabled ? "listDiv" : "listDiv enabled");
        this.state.elements.forEach((element, index) => {
            elementFields.push(
                <div key={element} className={classes}>
                    <EditableField
                        className="listElement"
                        tagName={"li"}
                        key={index}
                        childKey={"li" + index}
                        id={index}
                        onChange={this.handleElementChange}
                        html={element}
                        disabled={this.props.isDisabled }
                        placeholderText={this.props.placeholderText}
                    />
                    <ImageButton className="removeButton" key={"remove" + index} alt={"Remove"} imagePath={rm} onPress={this.handleRemove} id={index} isHidden={this.props.isDisabled} />
                </div>
            );
        });

        if (this.props.isOrdered) {
            return (
                <div>
                    <h3 className="listTitle">{this.props.listTitle}<ImageButton className="addButton" alt={"Add"} imagePath={add} onPress={this.handleAdd} isHidden={this.props.isDisabled} /></h3>
                    <ol>
                        {elementFields}
                    </ol>
                </div>

            );
        } else {
            return (
                <div>
                    <h3 className="listTitle">{this.props.listTitle}<ImageButton className="addButton" alt={"Add"} imagePath={add} onPress={this.handleAdd} isHidden={this.props.isDisabled} /></h3>
                    <ul>
                        {elementFields}
                    </ul>
                </div>
            );
        }
    }
}

export default EditableList;
