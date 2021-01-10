import React from "react";
import "./css/Cards.css";
import CardItem from "./CardItem";
import { Redirect } from "react-router-dom";

function Cards() {
  return (
    <div className="cards">
      <h1>Cook. Share. Make it Your Own.</h1>
      <p class="center">Here are a few of the things we've been cooking. <br/>  Give them a try, add your own twist, and let us knows how it goes on Culina.</p>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/img-9.jpg"
              text="Berry Cream Cheese Cake from Yossi Arefi"
              label="Epicurious"
              path="/"
              pathname="https://www.epicurious.com/recipes/food/views/berry-cream-cheese-cake-yossi-arefi"
            />  
            <CardItem
              src="images/img-4.jpg"
              text="BA's Breakfast Sandwich from Alison Roman"
              label="Bon Appétit"
              path="/"
              pathname="https://www.bonappetit.com/recipe/bas-best-breakfast-sandwich"
            />
            <CardItem
              src="images/img-2.jpg"
              text="Rib-Eye and Potatoes from David Tanis"
              label="NYT Cooking"
              path="/"
              pathname="https://cooking.nytimes.com/recipes/1019175-rib-eye-steak-and-potatoes-for-two"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-3.jpg"
              text="Miso-glazed Salmon with Vinegar Rice from Chris Morocco"
              label="Epicurious"
              path="/"
              pathname="https://www.epicurious.com/recipes/food/views/miso-glazed-salmon-with-sushi-rice"
            />
            <CardItem
              src="images/img-8.jpg"
              text="Creamy Vegan Pasta from Sarah Jampel"
              label="Bon Appétit"
              path="/"
              pathname="https://www.bonappetit.com/story/vegan-pasta-beans"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
