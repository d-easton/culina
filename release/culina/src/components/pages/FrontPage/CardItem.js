import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

function CardItem(props) {
  let history = useHistory();

  return (
    <>
      <a href={props.link}>
        <li className="cards__item">
          <a className="cards__item__link">
            {/* href={props.pathname}> */}
            <figure
              className="cards__item__pic-wrap"
              data-category={props.label}
            >
              <img
                className="cards__item__img"
                alt="Food Image"
                src={props.src}
              />
            </figure>
            <div className="cards__item__info">
              <h5 className="cards__item__text">{props.text}</h5>
            </div>
          </a>
        </li>
      </a>
    </>
  );
}

export default CardItem;
