import React from "react";
import "./css/Cards.css";
import CardItem from "./CardItem";
import { Redirect } from "react-router-dom";

function Cards() {
  return (
    <div className="cards">
      <h1>Our recommendations</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/img-9.jpg"
              text="Explore your unawakened pallet as you dive into this cake"
              label="Dessert"
              path="/"
              pathname="https://www.epicurious.com/recipes/food/views/berry-cream-cheese-cake-yossi-arefi"
            />
            <CardItem
              src="images/img-2.jpg"
              text="Be filled with the smoky sensation of rib eye"
              label="Luxury"
              path="/"
              pathname="https://cooking.nytimes.com/recipes/1019175-rib-eye-steak-and-potatoes-for-two"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-3.jpg"
              text="Unpack the sushi roll; try this miso-glazed salmon atop a bed of vinegar rice"
              label="Luxury"
              path="/"
              pathname="https://www.epicurious.com/recipes/food/views/miso-glazed-salmon-with-sushi-rice"
            />
            <CardItem
              src="images/img-4.jpg"
              text="CRUNCH into the most amazing breakfast sandwich you have ever had"
              label="Experience"
              path="/"
              pathname="https://www.bonappetit.com/recipe/bas-best-breakfast-sandwich"
            />
            <CardItem
              src="images/img-8.jpg"
              text="Try the pasta that has redefined the limits of vegan cuisineaaa"
              label="SAVORY"
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
