import React from "react";
import "./css/RowCard.css";

function RowCard(props) {
  const handleClick = (recipe) => {
    console.log(recipe.id);
    console.log(recipe);
  };

  return (
    <>
      <li className="boxs__item" onClick={() => handleClick(props.recipe)}>
        <a className="boxs__item__link" href={props.pathname}>
          <figure className="boxs__item__pic-wrap" data-category={props.label}>
            <img className="boxs__item__img" alt="Food Image" src={props.src} />
          </figure>
          <div className="boxs__item__info">
            <h5 className="boxs__item__text">{props.text}</h5>
          </div>
        </a>
      </li>
    </>
  );
}

export default RowCard;
