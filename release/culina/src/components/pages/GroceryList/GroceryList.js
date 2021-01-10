import React from "react";
import EditableList from "../Modal/EditableList";

import constants from "./constants.js";
import funcs from "./funcs.js";

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
    // this.handleCombineClicked = this.handleCombineClicked.bind(this);
    this.combineLikeIngredients = this.combineLikeIngredients.bind(this);

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
    console.log("save");
    // const savedList = {
    //   id: 0,
    //   email: this.state.email,
    //   ingredients: this.state.items,
    // };
    // this.setState({ isDisabled: true });

    // axios
    //   .put(updateGroceryListURL, savedList)
    //   .then((response) => {
    //     this.setData(response.data.ingredients);
    //   })
    //   .catch((err) => console.log("err", err));
  }

  getList() {
    // const getL = {
    //   email: this.state.email,
    // };
    // axios
    //   .post(getGroceryListURL, getL)
    //   .then((response) => {
    //     if (this._mounted) {
    //       this.setData(response.data[0].ingredients);
    //     }
    //   })
    //   .catch((err) =>
    //     axios.put(updateGroceryListURL, getL).then((response) => {
    //       if (this._mounted) {
    //         this.setData(response.data.ingredients);
    //       }
    //     })
    //   );
    // .catch(err => console.log('err', err)) )

    // Test data
    const testData = [
      ["EGG", "egg", "", 3],
      ["WHOLE_WHEAT_BREAD", "whole wheat bread", "loaf", 1],
      ["GARLIC", "garlic", "head of", 1],
      ["WHOLE_WHEAT_BREAD", "whole wheat bread", "loaf", 1],
      ["EGG", "egg", "", 13],
      ["SALMON", "salmon", "filet", 3],
      ["WHOLE_WHEAT_BREAD", "whole wheat bread", "slice", 1],
      ["RIBEYE_STEAK", "ribeye steak", "", 2]
    ]
    this.setData(testData);
    console.log(this.state.items);
  }

  setData(res) {
    if (res == null) {
      console.log("null");
      this.setState({ items: [] });
    } else {
      
      console.log(res);
      this.setState({ items: res }, () =>{
        console.log(this.state.items);
        this.forceUpdate();
      });
    }
  }

  combineLikeIngredients() {
    // present confirmation

    // prepare for comparison
    let results = [];
    let existing = this.state.items;

    existing.forEach( (element) => {

      let newElement = true;

      // get record
      let recordIndex = funcs.getRecordIndex(element, results);

      // check if this ingredient with this unit already exists
      if (recordIndex != -1) {
        // confirm units match
        if ( element[constants.unit] == results[recordIndex][constants.unit]) {
          newElement = false;
          results[recordIndex][constants.quantity] = results[recordIndex][constants.quantity] + element[constants.quantity];
        }
      }

      // failed previous conditions, add as new record
      if (newElement) {
        results.push(element);
      }
    });

    // update state
    this.setState({ 
      items: results,
      // itemIDS: resultIDS
    }, () => {
      console.log(this.state.items);
    });
  }

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
      
      <div className="groceryContainer">
        <div>
          <button
            className="btn btn-light btn-header"
            onClick={this.combineLikeIngredients}
          >
            Combine
          </button>
        </div>
      
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
      </div>
    );
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default GroceryList;
