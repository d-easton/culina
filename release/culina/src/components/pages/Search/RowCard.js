import React, { useState, useEffect, useCallback } from "react";
import "./css/RowCard.css";
import * as bs from "react-bootstrap";

const axios = require("axios");
const updateRecipeURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/updateRecipe";
const addRecipeURL =
  "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/addRecipeForUser";

const RowCard = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [likedmodalShow, setLikedModalShow] = useState(false);
  const [dislikedmodalShow, setDislikedModal] = useState(false);
  const [alreadyShown, setAlreadyShown] = useState(false);
  const [like, setLike] = useState();
  const [dislike, setDislike] = useState();

  useEffect(() => {}, []);

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

    if (props.recipe.addLike == 1) {
      setLike(props.recipe.likes + 1);
    } else {
      setLike(props.recipe.likes);
    }

    if (props.recipe.addDislike == 1) {
      setDislike(props.recipe.dislikes + 1);
    } else {
      setDislike(props.recipe.dislikes);
    }

    if (props.recipe.unaddLike == 1) {
      setLike(props.recipe.likes);
    }

    if (props.recipe.unaddDislike == 1) {
      setDislike(props.recipe.dislikes);
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
          <br></br>
          <h5>Likes: {like}</h5>
          <br></br>
          <h5>Dislikes: {dislike}</h5>
        </bs.Modal.Body>

        <bs.Modal.Footer>
          <bs.Button
            className="likeModal  ml-1"
            variant="success"
            onClick={() => {
              addLike(props.recipe, props.user);
            }}
          >
            {/* {props.user.email == props.recipe.email ||
            props.recipe.liked.includes(props.user.email)
              ? "Unlike"
              : "Like"} */}
            Like
          </bs.Button>
          <bs.Button
            className="dislikeModal  mr-auto"
            variant="danger"
            onClick={() => {
              addDislike(props.recipe, props.user);
            }}
          >
            {/* {props.user.email == props.recipe.email ||
            props.recipe.disliked.includes(props.user.email)
              ? "Un-Dislike"
              : "Dislike"} */}
            Dislike
          </bs.Button>

          <bs.Button
            className="addRecipe"
            onClick={() => {
              if (props.recipe.email == props.user.email) {
                alreadyInRecipes();
              } else {
                addToMyRecipes(props);
              }
            }}
          >
            Add to My Recipes
          </bs.Button>
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

  function alreadyInRecipes() {
    setAlreadyShown(true);
    setModalShow(false);
  }

  function addToMyRecipes(props) {
    let data = props.recipe;
    data.email = props.user.email;
    data.copy = true;

    axios
      .post(addRecipeURL, data)
      .then((response) => {
        setModalShow(false);
      })
      .catch((err) => console.log("err", err));
  }

  function getData(recipe) {
    const savedRecipe = {
      id: recipe.id,
      email: recipe.email,
      author: recipe.author,
      image: recipe.image,
      title: recipe.title,
      public: recipe.public,
      copy: recipe.copy,
      likes: recipe.likes,
      dislikes: recipe.dislikes,
      description: recipe.description,
      category: recipe.category,
      liked: recipe.liked,
      disliked: recipe.disliked,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    };
    return savedRecipe;
  }

  function addLike(recipe, currentUser) {
    if (
      currentUser.email == recipe.email ||
      recipe.liked.includes(currentUser.email)
    ) {
      setLikedModalShow(true);
      setModalShow(false);

      // props.recipe.unaddLike = 1;
      // setLike(props.recipe.likes - 1);
      // const data = getData(recipe);
      // data.likes = data.likes - 1;
      // if (data.likes < 0) data.likes = 0;
      // data.liked = data.liked.filter((person) => person !== currentUser.email);
      // props.recipe.liked = data.liked;
      // axios
      //   .put(updateRecipeURL, data)
      //   .then((response) => {
      //     // setModalShow(false);
      //   })
      //   .catch((err) => console.log("err", err));
    } else {
      props.recipe.addLike = 1;
      setLike(props.recipe.likes + 1);
      const data = getData(recipe);
      data.likes = data.likes + 1;
      let likedPeople = data.liked;
      likedPeople.push(currentUser.email);
      axios
        .put(updateRecipeURL, data)
        .then((response) => {
          // setModalShow(false);
        })
        .catch((err) => console.log("err", err));
    }
  }

  function addDislike(recipe, currentUser) {
    if (
      currentUser == recipe.email ||
      recipe.disliked.includes(currentUser.email)
    ) {
      setDislikedModal(true);
      setModalShow(false);

      // props.recipe.unaddDislike = 1;
      // setDislike(props.recipe.dislikes - 1);
      // const data = getData(recipe);
      // data.dislikes = data.dislikes - 1;
      // if (data.dislikes < 0) data.dislikes = 0;
      // data.disliked = data.disliked.filter(
      //   (person) => person !== currentUser.email
      // );
      // props.recipe.disliked = data.disliked;
      // axios
      //   .put(updateRecipeURL, data)
      //   .then((response) => {
      //     // setModalShow(false);
      //   })
      //   .catch((err) => console.log("err", err));
    } else {
      props.recipe.addDislike = 1;
      setDislike(props.recipe.dislikes + 1);
      const data = getData(recipe);
      data.dislikes = data.dislikes + 1;
      let dislikedPeople = data.disliked;
      dislikedPeople.push(currentUser.email);
      axios
        .put(updateRecipeURL, data)
        .then((response) => {
          // setModalShow(false);
        })
        .catch((err) => console.log("err", err));
    }
  }

  function LikedModal(props) {
    return (
      <bs.Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <bs.Modal.Body>
          <h2>You already liked this recipe</h2>
        </bs.Modal.Body>

        <bs.Modal.Footer>
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

  function DislikedModal(props) {
    return (
      <bs.Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <bs.Modal.Body>
          <h2>You already disliked this recipe</h2>
        </bs.Modal.Body>

        <bs.Modal.Footer>
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

  function AlreadyShownModal(props) {
    return (
      <bs.Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <bs.Modal.Body>
          <h2>You already added this recipe to your list</h2>
        </bs.Modal.Body>

        <bs.Modal.Footer>
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

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <>
      <li className="boxs__item" onClick={() => setModalShow(true)}>
        <a className="boxs__item__link" href={props.pathname}>
          <figure className="boxs__item__pic-wrap" data-category={props.label}>
            <img className="boxs__item__img" alt="Food Image" src={props.src} />
          </figure>
          <div className="boxs__item__info">
            <h5 className="boxs__item__text">{truncate(props.text, 33)}</h5>
          </div>
        </a>
      </li>
      <Modal
        recipe={props.recipe}
        user={props.user}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <LikedModal
        recipe={props.recipe}
        user={props.user}
        show={likedmodalShow}
        onHide={() => setLikedModalShow(false)}
      />
      <DislikedModal
        recipe={props.recipe}
        user={props.user}
        show={dislikedmodalShow}
        onHide={() => setDislikedModal(false)}
      />
      <AlreadyShownModal
        recipe={props.recipe}
        user={props.user}
        show={alreadyShown}
        onHide={() => setAlreadyShown(false)}
      />
    </>
  );
};

export default RowCard;
