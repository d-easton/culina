import React from "react";
import EditableList from "../Modal/EditableList";

import constants from "./constants.js";
import "../css/GroceryList.css";

const axios = require("axios");
const addGroceryListURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/addItemToList";
const updateGroceryListURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/updateGroceryList";
const getGroceryListURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getGroceryList";

class GroceryList extends React.Component {
  _mounted = false;
  constructor(props) {
    super(props);

    this.state = {
      items: props.list,
      isDisabled: true,
      show: false,
      email: props.email,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.beginEdit = this.beginEdit.bind(this);
    this.getList = this.getList.bind(this);
    this.setData = this.setData.bind(this);

    // this.checkIngredientDatabase = this.checkIngredientDatabase(this);
    // this.combineLikeIngredients = this.combineLikeIngredients(this);

    if (this.state.items == undefined) {
      this.setState({ items: ["Loading"] });
    }
  }

  componentDidMount() {
    this._mounted = true;
    this.getList();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleFieldChange(stateKey, value) {
    this.setState({ [stateKey]: value });
  }

  beginEdit() {
    this.setState({ isDisabled: false });
  }

  saveChanges() {
    const savedList = {
      id: 0,
      email: this.state.email,
      ingredients: this.state.items,
    };
    this.setState({ isDisabled: true });

    axios
      .put(updateGroceryListURL, savedList)
      .then((response) => {
        this.setData(response.data.ingredients);
      })
      .catch((err) => console.log("err", err));
  }

  getList() {
    const getL = {
      email: this.state.email,
    };
    axios
      .post(getGroceryListURL, getL)
      .then((response) => {
        if (this._mounted) {
          this.setData(response.data[0].ingredients);
        }
      })
      .catch((err) =>
        axios.put(updateGroceryListURL, getL).then((response) => {
          if (this._mounted) {
            this.setData(response.data.ingredients);
          }
        })
      );
    // .catch(err => console.log('err', err)) )
  }

  setData(res) {
    if (res == null) {
      this.setState({ items: [] });
    } else {
      this.setState({ items: res });
      this.forceUpdate();
    }
  }

  // combineLikeIngredients() {
  //   // present confirmation

  //   // prepare for comparison
  //   let results = [];
  //   let resultIDs = [];
  //   let existing = [];

  //   existing.forEach( (element) => {
  //     // check if current ingredient already in results
  //     if ( resultIDs.includes(element.id) ) {
  //       // get record
  //       let record = getIngredientRecord(element.id, results);

  //       // check if units match
  //       if ( element.unit == record.unit) {

  //       }
  //     }
  //   });
  // }

  render() {
    const list = (
      <EditableList
        elements={
          this.state.items == undefined ? ["Loading"] : this.state.items
        }
        id={getKeyByValue(this.state, this.state.items)}
        isOrdered={false}
        isDisabled={this.state.isDisabled}
        onChange={this.handleFieldChange}
        listTitle={"Grocery List: "}
        placeholderText="New Item"
      />
    );

    return (
      <div className="groceryModal">
        <div className="groceryList">
          {list}
          <input
            type="submit"
            onClick={this.saveChanges}
            value="Save"
            hidden={this.state.isDisabled}
          />
          <input
            type="submit"
            onClick={this.beginEdit}
            value="Edit"
            hidden={!this.state.isDisabled}
          />
        </div>
      </div>
    );
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default GroceryList;
