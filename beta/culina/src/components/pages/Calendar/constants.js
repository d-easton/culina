// data modes
const CALENDAR = 0;
const RECIPE = 1;

// axios URLs
const getCalendarURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getGroceryList";
const getRecipeURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getGroceryList";


const recipe1 = {
    "header": {
            "recipe-title": "4-Hour Chili",
            "author": "ethan",
            "display_img": "/path/to/img/bucket",
            "id": 0,
    },
    "ingredients": [
        "4 tablespoons unsalted butter",
        "3 large yellow onions, cut in 1/4-inch half-moons (about 4 cups)",
        "Salt and pepper",
        "1 bay leaf"
    ],
    "steps": [
        "Put 2 tablespoons butter in a large cast-iron skillet or wide, heavy-bottomed pot over medium-high heat...",
        "In a small saucepan, add the honey, butter and salt.",
        "Bring to a foaming boil"
    ],
    "day-code": ""
};
const recipe2 = {
    "header": {
            "recipe-title": "Beef Wellington",
            "author": "david",
            "display_img": "/path/to/img/bucket",
            "id": 1,
    },
    "ingredients": [
        "beef",
        "puff pastry",
        "Salt and pepper"
    ],
    "steps": [
        "make it",
        "eat it"
    ],
    "day-code": ""
};
const recipe3 = {
    "header": {
            "recipe-title": "Sushi",
            "author": "emily",
            "display_img": "/path/to/img/bucket",
            "id": 2,
    },
    "ingredients": [
        "fish",
        "vinegar",
        "rice",
        "nori",
    ],
    "steps": [
        "make the rice w the vinegar",
        "put the rice on the nori",
        "put the fish on the rice and wrap it all up"
    ],
    "day-code": ""
};
const staticTestData = [
    recipe1,
    recipe2,
    recipe3
]

const constants = {
    'data': staticTestData,
    'getCalendarURL': getCalendarURL,
    'getRecipeURL': getRecipeURL,
    'calendarCode': CALENDAR,
    'recipeCode': RECIPE
}
export default constants;
