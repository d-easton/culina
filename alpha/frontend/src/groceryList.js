import React from 'react';
import EditableList from './EditableList';

class GroceryList extends React.Component {
    constructor(props) {
        super(props)
        let list = this.props.list;
        
        this.state = {
            items: list.items,                 
            isDisabled: true,
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.beginEdit = this.beginEdit.bind(this);
    }

    handleFieldChange(stateKey, value) {
        this.setState({ [stateKey]: value });
    }

    beginEdit() {
        this.setState({isDisabled: false}); 
    }

    saveChanges() {
        const savedList = {
            list: this.state.items,
        }
        this.setState({ isDisabled: true });
        console.log(savedList);
    }

    render() {

        const list = <EditableList
            elements={this.state.items}
            id={getKeyByValue(this.state, this.state.items)}
            isOrdered={false}
            isDisabled={this.state.isDisabled}
            onChange={this.handleFieldChange}
            listTitle={"Grocery List: "}
        />;

        return (
           <div className="groceryList">
               {list}
               <input type="submit" onClick={this.saveChanges} value="Save" hidden={this.state.isDisabled}/>
                <input type="submit" onClick={this.beginEdit} value="Edit" hidden={!this.state.isDisabled}/>
            </div>
        )
    }

}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export default GroceryList;