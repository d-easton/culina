import React from 'react';
import GroceryList from './groceryList.js';


class ListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalGL: false,
            email: props.email
        }

        this.closeModalGL = this.closeModalGL.bind(this);
        this.displayModalGL = this.displayModalGL.bind(this);
        this.toggleGroceryList = this.toggleGroceryList.bind(this);
    }

    componentDidMount() {
        console.log("Mounted ListContainer") 
    }

    closeModalGL() {
        this.setState({ showModalGL: false })
    }

    displayModalGL() {
        this.setState({ showModalGL: true });
    }

    toggleGroceryList() {
        if(this.state.showModalGL) {
            console.log("close");
            this.closeModalGL();
        } else {
            console.log("show");
            this.displayModalGL();
        }
    }


    render() {
        const testList = {
            items: [
                "Pasta",
                "Chicken",
                "Cheese",
                "Apples"
            ],
            newItem : "new"
          } 
 
        if (this.state.showModalGL) {
            return (
                <div className="listContainer">
                    <button onClick={this.toggleGroceryList}>Close List</button>
                    <GroceryList list={testList} email={this.props.email}/>
                </div>
            );
        } else {
            return (
                <div className="listContainer">
                    <button onClick={this.toggleGroceryList}>View List</button>
                </div>
            );
        }
    }
}

export default ListContainer;