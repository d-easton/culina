import React, { useState, useEffect } from "react";
import "./css/Display.css";

const axios = require("axios");
const getRecipeURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getRecipeForUser";

const Display = (props) => {
  const [recipe, setRecipe] = useState([]);
  const email = {
    email: "000@gmail.com",
  };

  useEffect(() => {
    async function fetchRecipes() {
      return axios
        .post(getRecipeURL, email)
        .then((response) => {
          setRecipe(
            response.data[Math.floor(Math.random() * response.data.length)]
          );
        })
        .catch((err) => console.log("err", err));
    }
    fetchRecipes();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${recipe.image}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">{recipe.title}</h1>
        <br></br>
        <h1 className="banner_author">{recipe.author}</h1>
        {/* <div>
          <button className="banner_button">Recipe</button>
        </div> */}
        <br></br>
        <h1 className="banner_description">
          {truncate(recipe.description, 500)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Display;
// rafce shortcut
