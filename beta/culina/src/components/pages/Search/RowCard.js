import React, { useState, useEffect, useCallback } from "react";
import "./css/RowCard.css";
import * as bs from "react-bootstrap";

const axios = require("axios");
const updateRecipeURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/updateRecipe";

const RowCard = (props) => {
  const [modalShow, setModalShow] = useState(false);
  // const [recipes, setRecipes] = useState([]);
  // const [likedmodalShow, setLikedModalShow] = useState(false);
  // const [showToast, setShowToast] = useState(false);
  // const forceUpdate = useForceUpdate();

  // useEffect(() => {}, []);

  function Modal(props) {
    let ingridients = [];
    for (let i = 0; i < props.recipe.ingredients.length; i++) {
      ingridients.push(props.recipe.ingredients[i].text);
      ingridients.push(<br></br>);
    }
    let steps = [];
    for (let i = 0; i < props.recipe.steps.length; i++) {
      steps.push(props.recipe.steps[i].text);
      steps.push(<br></br>);
    }
    return (
      <bs.Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <bs.Modal.Header>
          <bs.Modal.Title id="contained-modal-title-vcenter">
            {props.recipe.title}
            <br></br>
            {props.recipe.author}
          </bs.Modal.Title>
        </bs.Modal.Header>

        <bs.Modal.Body>
          <img
            className="modal_pic"
            alt="Food Image"
            src={props.recipe.image}
          />
          <br></br> <br></br>
          <p>{props.recipe.description}</p>
          <br></br>
          <h4>Ingredients</h4>
          <p>{ingridients}</p>
          <br></br>
          <h4>Steps</h4>
          <p>{steps}</p>
          {/* <br></br>
          <h5>Likes: {props.recipe.likes}</h5>
          <br></br>
          <h5>Dislikes: {props.recipe.dislikes}</h5> */}
        </bs.Modal.Body>

        <bs.Modal.Footer>
          {/* <bs.Button
            className="likeModal  ml-1"
            variant="success"
            onClick={() => {
              {
                props.recipe.likes = props.recipe.likes + 1;
              }
              addLike(props.recipe, props.user);
            }}
          >
            Like
          </bs.Button>
          <bs.Button
            className="dislikeModal  mr-auto"
            variant="danger"
            onClick={() => {
              {
                props.recipe.dislikes = props.recipe.dislikes + 1;
              }
              addDislike(props.recipe, props.user);
            }}
          >
            Dislike
          </bs.Button> */}
          <bs.Button
            className="closeModal"
            variant="secondary"
            onClick={props.onHide}
          >
            Close
          </bs.Button>
        </bs.Modal.Footer>
      </bs.Modal>
    );
  }

  // function getData(recipe) {
  //   const savedRecipe = {
  //     id: recipe.id,
  //     email: recipe.email,
  //     author: recipe.author,
  //     image: recipe.image,
  //     title: recipe.title,
  //     public: recipe.public,
  //     likes: recipe.likes,
  //     dislikes: recipe.dislikes,
  //     description: recipe.description,
  //     category: recipe.category,
  //     liked: recipe.liked,
  //     disliked: recipe.disliked,
  //     ingredients: recipe.ingredients,
  //     steps: recipe.steps,
  //   };
  //   return savedRecipe;
  // }

  // function addLike(recipe, currentUser) {
  //   if (
  //     currentUser.email == recipe.email ||
  //     recipe.liked.includes(currentUser.email)
  //   ) {
  //     console.log("You already liked it");
  //     // setModalShow(false);
  //     // setLikedModalShow(true);
  //   } else {
  //     const data = getData(recipe);
  //     data.likes = data.likes + 1;
  //     console.log("about to write: ", data);
  //     axios
  //       .put(updateRecipeURL, data)
  //       .then((response) => {
  //         console.log(response);
  //         setModalShow(false);
  //         forceUpdate(); // force re-render
  //       })
  //       .catch((err) => console.log("err", err));
  //   }
  // }

  // function addDislike(recipe, currentUser) {
  //   console.log(currentUser, recipe.email);
  //   if (currentUser == recipe.email) {
  //     console.log("You already disliked it");
  //   } else {
  //     const data = getData(recipe);
  //     data.dislikes = data.dislikes + 1;
  //     console.log("about to write: ", data);
  //     axios
  //       .put(updateRecipeURL, data)
  //       .then((response) => {
  //         console.log(response);
  //         setModalShow(false);
  //       })
  //       .catch((err) => console.log("err", err));
  //   }
  // }

  // function LikedModal() {
  //   return (
  //     <bs.Modal
  //       {...props}
  //       size="lg"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <bs.Modal.Header>
  //         <bs.Modal.Title id="contained-modal-title-vcenter"></bs.Modal.Title>
  //       </bs.Modal.Header>

  //       <bs.Modal.Body></bs.Modal.Body>

  //       <bs.Modal.Footer>
  //         <bs.Button
  //           className="closeModal"
  //           variant="secondary"
  //           onClick={addDislike(props.recipe, props.user)}
  //         >
  //           Close
  //         </bs.Button>
  //       </bs.Modal.Footer>
  //     </bs.Modal>
  //   );
  // }

  return (
    <>
      <li
        className="boxs__item"
        // onClick={() => handleClick(props.recipe)}
        onClick={() => setModalShow(true)}
      >
        <a className="boxs__item__link" href={props.pathname}>
          <figure className="boxs__item__pic-wrap" data-category={props.label}>
            <img className="boxs__item__img" alt="Food Image" src={props.src} />
          </figure>
          <div className="boxs__item__info">
            <h5 className="boxs__item__text">{props.text}</h5>
          </div>
        </a>
      </li>
      <Modal
        recipe={props.recipe}
        user={props.user}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {/* <LikedModal
        show={likedmodalShow}
        onHide={() => setLikedModalShow(false)}
      /> */}
    </>
  );
};

export default RowCard;

// export function useForceUpdate() {
//   const [, setTick] = useState(0);
//   const update = useCallback(() => {
//     setTick((tick) => tick + 1);
//   }, []);
//   return update;
// }
