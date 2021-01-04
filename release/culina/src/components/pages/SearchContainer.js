import React, { useState, useEffect } from "react";
import Row from "./Search/Row";
import Display from "./Search/Display";
import "./css/Search.css";

const SearchContainer = (props) => {
  const { user } = props;
  const [search, setSearch] = useState([]);

  return (
    <div>
      <Display email={user} />

      <label className="text">
        {" "}
        Search:{" "}
        <input
          type="text"
          className="textBox"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <Row email={user} category={"Breakfast"} search={search} />
      <Row email={user} category={"Lunch"} search={search} />
      <Row email={user} category={"Dinner"} search={search} />
      <Row email={user} category={"Dessert"} search={search} />
    </div>
  );
};

export default SearchContainer;
