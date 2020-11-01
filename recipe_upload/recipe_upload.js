/**
 * Culina
 * Emily Kaufman
 * 
 * Usage:
 * -Users can upload screenshots of recipes to their recipe profile
 * -will have this communicate with google vision eventually
 */
var sampleRecipes = ["apple pie", "chocolate chip cookies", "pasta marinara"];
var recipeList = document.getElementById("recipes");


/**
 * Once connected to the database, this will pull all the user's recipes and display them
 */
window.onload = function() {
    displayRecipes();
}
function displayRecipes() {
    for(i=0; i<sampleRecipes.length; i++) {
        var recipe = document.createElement("li");
        var t = document.createTextNode(sampleRecipes[i]);
        recipe.appendChild(t);
        recipeList.appendChild(recipe);
    }
}

/**
 * Will make a file to add new recipe file to database
 */
function addToDB() {
    
}

document.getElementById("submitBTN").addEventListener("click", function() {newRecipe()});

function newRecipe() {
    var inputFile = document.getElementById("inputFile").value;
    var fileName = document.getElementById("filename").value;
    console.log(fileName);
    console.log(inputFile);

    var newRecipe = document.createElement("li");
    var t = document.createTextNode(fileName);
    newRecipe.appendChild(t);
    recipeList.appendChild(newRecipe);
}
