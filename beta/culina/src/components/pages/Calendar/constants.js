// data modes
const CALENDAR = 0;
const RECIPE = 1;

// axios URLs
const getCalendarURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getGroceryList";
const getRecipeURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getRecipeForUser";


const recipe1 = {
    "title": "4-Hour Chili",
    "author": "ethan",
    "display_img": "/path/to/img/bucket",
    "id": 'recipe1',
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
};
const recipe2 = {
    "title": "Beef Wellington",
    "author": "jeremie",
    "display_img": "/path/to/img/bucket",
    "id": "recipe2",
    "ingredients": [
        "beef",
        "puff pastry",
        "Salt and pepper"
    ],
    "steps": [
        "make it",
        "eat it"
    ],
};
const recipe3 = {
    "title": "Sushi",
    "author": "emily",
    "display_img": "/path/to/img/bucket",
    "id": "recipe3",
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
};
const staticTestData = {
    recipes : {
        "recipe1": recipe1,
        "recipe2": recipe2,
        "recipe3": recipe3
    },
    calendarFrames : {
        'calSun' : {
            'id': 'calSun',
            'title': 'Sunday',
            'recipeIDs': []
        },
        'calMon' : {
            'id': 'calMon',
            'title': 'Monday',
            'recipeIDs': []
        },
        'calTue' : {
            'id': 'calTue',
            'title': 'Tuesday',
            'recipeIDs': []
        },
        'calWed' : {
            'id': 'calWed',
            'title': 'Wednesday',
            'recipeIDs': []
        },
        'calThu' : {
            'id': 'calThu',
            'title': 'Thursday',
            'recipeIDs': []
        },
        'calFri' : {
            'id': 'calFri',
            'title': 'Friday',
            'recipeIDs': []
        },
        'calSat' : {
            'id': 'calSat',
            'title': 'Saturday',
            'recipeIDs': []
        }
    },
    recipeBox: {
        'id': 'recipeBox',
        'title': 'Recipes',
        'recipeIDs': [] //'recipe1', 'recipe2', 'recipe3'
    },
    calendarOrder : ['calSun', 'calMon', 'calTue', 'calWed', 'calThu', 'calFri', 'calSat']
}

const constants = {
    'data': staticTestData,
    'getCalendarURL': getCalendarURL,
    'getRecipeURL': getRecipeURL,
    'calendarCode': CALENDAR,
    'recipeCode': RECIPE
}
export default constants;
