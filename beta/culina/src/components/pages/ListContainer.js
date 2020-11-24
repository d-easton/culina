import React from 'react';
import GroceryList from './GroceryList/GroceryList';
const axios = require('axios');
const addGroceryListURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/addItemToList";
const updateGroceryListURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/updateGroceryList";
const getGroceryListURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getGroceryList";


class ListContainer extends React.Component {
    _mounted = false;
    constructor(props) {
        super(props);

        this.state = {
            showModalGL: true,
            email: props.user.email
        }

        this.closeModalGL = this.closeModalGL.bind(this);
        this.displayModalGL = this.displayModalGL.bind(this);
        this.toggleGroceryList = this.toggleGroceryList.bind(this);
        this.getList = this.getList.bind(this)
        this.setData = this.setData.bind(this)

        // this.getList();
    }
    componentDidMount() {
        this._mounted = true
        this.getList();
    }

    componentWillUnmount() {
        this._mounted = false
    }

    closeModalGL() {
        this.setState({ showModalGL: false })
    }

    displayModalGL() {
        this.setState({ showModalGL: true });
    }

    toggleGroceryList() {
        if(this.state.showModalGL) {
            this.closeModalGL();
            this.getList();
        } else {
            this.displayModalGL();
        }
    }

    getList() {
        const getL = {
            "email": this.state.email
        }
        axios.post(getGroceryListURL, getL)
            .then(response => {
                if(this._mounted) {
                    this.setData(response.data[0].ingredients)
                }
            })
            .catch(err => console.log('err', err));
    }

    setData(res) {
        if (res == null) {
            this.setState({ items: [] });
        } else {
            this.setState({ items: res});
        }
    }


    render() {
        if (this.state.showModalGL && this.state.items) {
            return (
                <div className="listContainer">
                    <button onClick={this.toggleGroceryList}>Close List</button>
                    <GroceryList list={this.state.items} email={this.state.email}/>
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