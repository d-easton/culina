import React from "react";
import Row from "./Search/Row";
import Display from "./Search/Display";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const SearchContainer = (props) => {
  const { user } = props;

  return (
    <div>
      <Display email={user} />
      {/* ON DROPDOWN HAVE LARGE ONES */}
      {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item href="#/action-1">Breakfast</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
      <Row email={user} category={"Breakfast"} /> */}
      <Row email={user} category={"Breakfast"} />
      <Row email={user} category={"Lunch"} />
      <Row email={user} category={"Dinner"} />
      <Row email={user} category={"Dessert"} />
    </div>
  );
};

export default SearchContainer;
