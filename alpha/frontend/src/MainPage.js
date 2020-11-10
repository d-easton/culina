import React from 'react';
import RecipeContainer from './RecipeContainer';
const axios = require('axios');


const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "http://35.193.28.175:8085/getAllRecipe"; 
const url2 = "http://35.193.28.175:8085/addRecipe"; 
const url3 = "http://35.193.28.175:8085/addRecipeForUser"; 

// const url = "http://localhost:8085/getAllRecipe"; 
// const url2 = "http://localhost:8085/addRecipe"; 
// const url3 = "http://localhost:8085/addRecipeForUser"; 
const k = proxyurl + url;
const j = proxyurl + url2;
const l = proxyurl + url3;

// const k = url;
// const j = url2;
// const l = url3;
// let recipeJSON = [];


// fetch(k) // https://cors-anywhere.herokuapp.com/https://example.com
// .then(response => response.json())
// .then(recipe => console.log(recipe))
// .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))



// fetch(k)
//   .then(response => response.json())
//   .then(json => {
//       console.log(json)
//   })

//     //for creating a recipe for a user
// axios
// .post(l, {
//         "Author": "nov gucci",
//         "Title": "nov flex",
//         "Ingredients": ["ing 1", "ing2"],
//         "Steps": ["step1", "step2"],
//         "ID": 23423423423,
//         "Email": "test@gmail.com"
//     }
// )
// .then(response => console.log(response))
// .catch(err => console.log('err', err));


//   //for creating a recipe
// axios
//     .post(j, {
//         "Author": "nov gucci",
//         "Title": "nov flex",
//         "Ingredients": ["ing 1", "ing2"],
//         "Steps": ["step1", "step2"],
//         "ID": 23423423423,
//         "Email": "test@gmail.com"
//         }
//     )
//     .then(response => console.log(response))
//     .catch(err => console.log('err', err));
      
// // for getting a recipe
// axios.get(k, {
//     method: 'GET',
//     mode: 'cors',
//     headers: { 'Access-Control-Allow-Origin': true },
// }).then(res => {
//     recipeJSON = res.data;
//     console.log(res)
//     console.log(recipeJSON)
//     });
    


const MainPage = ({ handleSignout }, { person }) => {



    /*
    for (let key in recipes) {
        recipeCards.push(
          //  <EditRecipeCard recipe={recipes[key]} key={key}/>
        );
    }
    */
    // var email = "test@gmail.com";
    console.log(handleSignout)
    console.log("email = ");
    // console.log(this.props)

    return (

        <section className="main">
            <nav>
                <h2> Welcome</h2>
                <button onClick={handleSignout}> Logout </button>


            </nav>
            <RecipeContainer email={person}/>
        </section>    
    );

};

export default MainPage;