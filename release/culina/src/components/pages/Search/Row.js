import React, { useState, useEffect } from "react";
import "./css/Row.css";
import RowCard from "./RowCard";

const axios = require("axios");
const getRecipeURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getAllRecipe";

const Row = (props) => {
  const { email, category } = props;
  const [recipes, setRecipes] = useState([]);
  const data = { Category: category };

  useEffect(() => {
    async function fetchRecipes() {
      return axios
        .post(getRecipeURL, data)
        .then((response) => {
          setRecipes(response.data);
        })
        .catch((err) => console.log("err", err));
    }
    fetchRecipes();

    // const interval = setInterval(() => {
    //   fetchRecipes();
    // }, 10000);

    // return () => clearInterval(interval);
  }, [email, category]);

  return (
    <div className="row">
      <h2 className="row_text">{category}</h2>

      <div className="row__images">
        {recipes
          .filter((recipe) => recipe.image.length > 5)
          .map((recipe) => (
            <RowCard
              recipe={recipe}
              className="row_image"
              key={recipe.id}
              src={recipe.image}
              text={recipe.title}
              label={category}
              user={email}
              category={category}
            />
          ))}
      </div>
    </div>
  );
};

export default Row;
