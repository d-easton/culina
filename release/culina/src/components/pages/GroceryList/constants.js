
const ID = 0;
const DISPLAY_NAME = 1;
const UNIT = 2;
const QUANTITY = 3;

const ingredientDatabase = {
    // MARK: BAKING
    "BAKING_POWDER": {
        "display_name": "baking powder",
        "translations": [

        ]
    },
    "BAKING_SODA": {
        "display_name": "baking soda",
        "translations": [

        ]
    },
    "BROWN_SUGAR": {
        "display_name": "brown sugar",
        "translations": [

        ]
    },
    "COCOA_POWDER": {
        "display_name": "cocoa powder",
        "translations": [

        ]
    },
    "CORN_STARCH": {
        "display_name": "corn starch",
        "translations": [

        ]
    },
    "CORN_STARCH": {
        "display_name": "corn starch",
        "translations": [

        ]
    },
    "FLOUR": {
        "display_name": "flour",
        "translations": [
            "white flour",
            "baking flour",
        ]
    },
    "HONEY": {
        "display_name": "honey",
        "translations": [

        ]
    },
    "IODIZED_SALT":{
        "display_name": "iodized salt",
        "translations": [
            
        ]
    },
    "KOSHER_SALT":{
        "display_name": "Kosher salt",
        "translations": [
            
        ]
    },
    "MOLASSES": {
        "display_name": "molasses",
        "translations": [

        ]
    },
    "SALT":{
        "display_name": "salt",
        "translations": [

        ]
    },
    "SEA_SALT":{
        "display_name": "sea salt",
        "translations": [
            
        ]
    },
    "STEVIA" : {
        "display_name": "stevia sweetener",
        "translations": [

        ]
    },
    "TURBINADO_SUGAR": {
        "display_name": "turbinado sugar",
        "translations": [

        ]
    },
    "WHITE_SUGAR" : {
        "display_name": "granulated white sugar",
        "translations": [

        ]
    },
    "YEAST": {
        "display_name": "yeast",
        "translations": [

        ]
    },
    // MARK: OIL & VINEGAR
    "APPLE_CIDER_VINEGAR": {
        "display_name": "apple cider vinegar",
        "translations": [

        ]
    },
    "BALSAMIC_VINEGAR": {
        "display_name": "balsamic vinegar",
        "translations": [
            "balsamico",
            "modena vinegar",
            "aceto balsamico di modena"
        ]
    },
    "COCONUT_OIL" : {
        "display_name": "coconut oil",
        "translations": [
    
        ]
    },
    "OLIVE_OIL":{
        "display_name": "extra virgin olive oil",
        "translations": [
            "olive oil",
            "evoo"
        ]
    },
    "PEANUT_OIL" : {
        "display_name": "peanut oil",
        "translations": [
    
        ]
    },
    "RED_WINE_VINEGAR" : {
        "display_name": "red wine vinegar",
        "translations": [
           
        ]
    },
    "SESAME_SEED_OIL" : {
        "display_name": "sesame seed oil",
        "translations": [
    
        ]
    },
    "TOASTED_SESAME_SEED_OIL" : {
        "display_name": "toasted sesame seed oil",
        "translations": [
    
        ]
    },
    "VEGETABLE_OIL" : {
        "display_name": "vegetable oil",
        "translations": [
            "canola_oil"
        ]
    },
    "VINEGAR": {
        "display_name": "vinegar",
        "translations": [
            "white vinegar",
            "regular vinegar",
            "regular white vinegar"
        ]
    },  
    "WHITE_WINE_VINEGAR" : {
        "display_name": "white wine vinegar",
        "translations": [
            "white vinegar",
            "regular vinegar",
            "regular white vinegar"
        ]
    },
    // SPICES & HERBS
    "ALLSPICE": {
        "display_name": "allspice",
        "translations": [
            "chinese_allspice"
        ]
    },
    "ANISE": {
        "display_name": "anise",
        "translations": [
            "star anise"
        ]
    },
    "BASIL": {
        "display_name": "basil",
        "translations": [

        ]
    },
    "CAJUN_SEASONING": {
        "display_name": "cajun seasoning",
        "translations": [
            "creole seasoning"
        ]
    },
    "CHILI_POWDER": {
        "display_name": "chili powder",
        "translations": [

        ]
    },
    "CHIVES":{
        "display_name": "chives",
        "translations": [

        ]
    },
    "CINNAMON": {
        "display_name": "cinnamon",
        "translations": [

        ]
    },
    "CLOVE": {
        "display_name": "clove",
        "translations": [

        ]
    },
    "CORIANDER": {
        "display_name": "coriander",
        "translations": [
            "cilantro"
        ]
    },
    "CUMIN": {
        "display_name": "cumin",
        "translations": [
            
        ]
    },
    "DILL": {
        "display_name": "dill",
        "translations": [

        ]
    },
    "FENNEL": {
        "display_name": "fennel",
        "translations": [
            
        ]
    },
    "GARLIC": {
        "display_name": "garlic",
        "translations": [

        ]
    },
    "GARLIC_POWDER": {
        "display_name": "garlic powder",
        "translations": [
            
        ]
    },
    "GREEN_ONION": {
        "display_name": "green onions",
        "translations": [
            
        ]
    },
    "HERB_DE_PROVENCE": {
        "display_name": "Herb de Provence",
        "translations": [
            "herbs de provence",
            "herbs du provence",
            "herb du provence",
        ]
    },
    "FRESH_BASIL": {
        "display_name": "fresh basil",
        "translations": [
            
        ]
    },
    "FRESH_CORIANDER": {
        "display_name": "fresh coriander",
        "translations": [
            "fresh cilantro"
        ]
    },
    "FRESH_DILL": {
        "display_name": "fresh dill",
        "translations": [
            
        ]
    },
    "FRESH_OREGANO": {
        "display_name": "fresh oregano",
        "translations": [
            
        ]
    },
    "FRESH_PARSLEY": {
        "display_name": "fresh parlsey",
        "translations": [
            
        ]
    },
    "FRESH_ROSEMARY": {
        "display_name": "fresh rosemary",
        "translations": [
            
        ]
    },
    "FRESH_THYME": {
        "display_name": "fresh thyme",
        "translations": [
            
        ]
    },
    "PARSLEY": {
        "display_name": "parlsey",
        "translations": [
            
        ]
    },
    "NUTMEG": {
        "display_name": "nutmeg",
        "translations": [

        ]
    },
    "OREGANO": {
        "display_name": "oregano",
        "translations": [

        ]
    },
    "SICHUAN_PEPPERCORN": {
        "display_name": "sichuan peppercorn",
        "translations": [
            "szechuan pepper",
            "szechwan pepper",
            "Chinese prickly ash",
            "Chinese pepper",
            "rattan pepper",
            "mala pepper"
        ]
    },
    "TERRAGON": {
        "display_name": "terragon",
        "translations": [
            
        ]
    },
    "THYME": {
        "display_name": "thyme",
        "translations": [
            
        ]
    },
    "ROSEMARY": {
        "display_name": "rosemary",
        "translations": [
            
        ]
    },
    // VEGETABLES
    "ARUGULA" : {
        "display_name": "arugula",
        "translations": [
            "rocket"
        ]
    },
    "ASPARAGUS" : {
        "display_name": "asparagus",
        "translations": [

        ]
    },
    "BROCCOLI" : {
        "display_name": "broccoli",
        "translations": [
            
        ]
    },
    "BROCCOLINI" : {
        "display_name": "broccolini",
        "translations": [
            
        ]
    },
    "BRUSSELS_SPROUT" : {
        "display_name": "Brussels sprouts",
        "translations": [
            
        ]
    },
    "CARROT" : {
        "display_name": "carrot",
        "translations": [
            
        ]
    },
    "CAULIFLOWER" : {
        "display_name": "cauliflower",
        "translations": [
            
        ]
    },
    "CUCUMBER" : {
        "display_name": "cucumber",
        "translations": [
            
        ]
    },
    "ENGLISH_CUCUMBER" : {
        "display_name": "English cucumber",
        "translations": [
            "seedless cucumber",
            "hothouse cucumber"
        ]
    },
    "GINGER_ROOT" : {
        "display_name": "ginger root",
        "translations": [
            "ginger",
            "fresh ginger"
        ]
    },
    "GLOBE_EGGPLANT" : {
        "display_name": "globe eggplant",
        "translations": [
            "eggplant"
        ]
    },
    "GREEN_BEAN" : {
        "display_name": "green beans",
        "translations": [
            
        ]
    },
    "JAPANESE_EGGPLANT" : {
        "display_name": "Japanese eggplant",
        "translations": [
            
        ]
    },
    "MUSHROOM": {
        "display_name": "mushrooms",
        "translations": [

        ]
    },
    "POTATO": {
        "display_name": "potato",
        "translations": [
            
        ]
    },
    "RED_ONION": {
        "display_name": "red onion",
        "translations": [
            
        ]
    },
    "SHALLOT": {
        "display_name": "shallots",
        "translations": [
            
        ]
    },
    "SPINACH" : {
        "display_name": "spinach",
        "translations": [
            
        ]
    },
    "SQUASH": {
        "display_name": "squash",
        "translations": [
            
        ]
    },
    "TOMATO" : {
        "display_name": "tomato",
        "translations": [
            
        ]
    },
    "VIDALIA_ONION": {
        "display_name": "vidalia onion",
        "translations": [
            
        ]
    },
    "WHITE_ONION": {
        "display_name": "white onion",
        "translations": [
            
        ]
    },
    "YELLOW_ONION": {
        "display_name": "yellow onion",
        "translations": [
            
        ]
    },
    "ZUCCHINI" : {
        "display_name": "zucchini",
        "translations": [
            
        ]
    },
    // FRUITS
    "AVOCADO" : {
        "display_name": "avocado",
        "translations": [

        ]
    },
    "RED_DELICIOUS_APPLE" : {
        "display_name": "red delicious apples",
        "translation": [
            
        ]
    },
    "GALA_APPLE" : {
        "display_name": "gala apples",
        "translation": [
            
        ]
    },
    "GREEN_APPLE" : {
        "display_name": "green apples",
        "translation": [
            "granny smith apples"
        ]
    },
    "BANANA" : {
        "display_name": "banana",
        "translations": [

        ]
    },
    "BLUEBERRY" : {
        "display_name": "blueberry",
        "translation": [
            
        ]
    },
    "CLEMENTINE" : {
        "display_name": "clementines",
        "translations": [
            "tangor"
        ]
    },
    "GRAPEFRUIT" : {
        "display_name": "grapefruit",
        "translations": [

        ]
    },
    "ICEBERG_LETTUCE": {
        "display_name": "iceberg lettuce",
        "translation": [

        ]
    },
    "LEMON" : {
        "display_name": "lemon",
        "translation": [

        ]
    },
    "LIME" : {
        "display_name": "lime",
        "translation": [
            
        ]
    },
    "MANGO" : {
        "display_name": "mango",
        "translation": [
            
        ]
    },
    "MIXED_BERRY" : {
        "display_name": "mixed berries",
        "translations": [
            "mixed berries"
        ]
    },
    "ORANGE" : {
        "display_name": "orange",
        "translation": [
            
        ]
    },
    "PINEAPPLE" : {
        "display_name": "pineapple",
        "translation": [
            
        ]
    },
    "RASPBERRY" : {
        "display_name": "RASPBERRY",
        "translation": [
            
        ]
    },
    "ROMAINE_LETTUCE" : {
        "display_name": "lemon",
        "translation": [

        ]
    },
    "STRAWBERRY" : {
        "display_name": "STRAWBERRY",
        "translation": [
            
        ]
    },
    // DAIRY
    "UNSALTED_BUTTER": {
        "display_name": "unsalted butter",
        "translations": [

        ]
    },
    "SALTED_BUTTER": {
        "display_name": "salted butter",
        "translations": [

        ]
    },
    "CREME_FRAICHE": {
        "display_name": "crème fraîche",
        "translations": [
            "creme fraiche"
        ] 
    },
    "EGG": {
        "display_name": "egg",
        "translations": [

        ]
    },
    "HALF_AND_HALF": {
        "display_name": "half and half",
        "translations": [

        ]
    },
    "HEAVY WHIPPING CREAM": {
        "display_name": "heavy whipping cream",
        "translations": [
            "heavy cream"
        ]
    },
    "2%_MILK": {
        "display_name": "2% milk",
        "translations": [
            "two percent milk",
            "two-percent milk",
            "2 percent milk"
        ]
    },
    "1%_MILK": {
        "display_name": "1% milk",
        "translations": [
            "one percent milk",
            "one-percent milk",
            "1 percent milk"
        ]
    },
    "WHOLE_MILK": {
        "display_name": "whole milk",
        "translations": [
        ]
    },
    "SKIM_MILK": {
        "display_name": "skim milk",
        "translations": [
        ]
    },
    "ALMOND_MILK": {
        "display_name": "almond milk",
        "translations": [
        ]
    },
    "SOY_MILK": {
        "display_name": "soy milk",
        "translations": [
        ]
    },
    "OAT_MILK": {
        "display_name": "oat milk",
        "translations": [
        ]
    },
    "SHREDDED_MOZZARELLA": {
        "display_name": "shredded mozzarella cheese",
        "translations": [
            "shredded mozzarella"
        ]
    },
    "SLICED_MOZZARELLA": {
        "display_name": "sliced mozzarella cheese",
        "translations": [
            "sliced mozzarella"
        ]
    },
    "PARMESAN": {
        "display_name": "parmesan cheese",
        "translations": [
            "parmesan"
        ]
    },
    "GRATED_PARMESAN": {
        "display_name": "grated parmesan cheese",
        "translations": [
            "grated parmesan"
        ]
    },
    "MANCHEGO": {
        "display_name": "manchego cheese",
        "translations": [
            "manchego"
        ]
    },
    "CHEDDAR": {
        "display_name": "cheddar cheese",
        "translations": [
            "cheddar"
        ]
    },
    "SHREDDED_CHEDDAR": {
        "display_name": "shredded cheddar cheese",
        "translations": [
            "shredded cheddar"
        ]
    },
    "EXTRA_SHARP_CHEDDAR": {
        "display_name": "extra sharp cheddar cheese",
        "translations": [
            "extra sharp cheddar",
            "extra-sharp cheddar",
            "extra-sharp cheddar cheese",
        ]
    },
    // MARK: PROTEIN
    // MARK: NON-ANIMAL PROTEINS
    "ALMOND": {
        "display_name": "almonds",
        "translations": [
        ]
    },
    "BLACK_BEAN": {
        "display_name": "black beans",
        "translations": [
        ]
    },
    "CASHEW": {
        "display_name": "cashews",
        "translations": [
        ]
    },
    "DRIED_CHICKPEA": {
        "display_name": "dried chickpeas",
        "translations": [
        ]
    },
    "KIDNEY_BEAN": {
        "display_name": "kidney beans",
        "translations": [
        ]
    },
    "PEANUT": {
        "display_name": "peanuts",
        "translations": [
        ]
    },
    "PISTACHIO": {
        "display_name": "peanuts",
        "translations": [
        ]
    },
    "PINTO_BEAN": {
        "display_name": "pinto beans",
        "translations": [
        ]
    },
    "RED_BEAN": {
        "display_name": "red beans",
        "translations": [
        ]
    },
    "ROASTED_PEANUT": {
        "display_name": "roasted peanuts",
        "translations": [
        ]
    },
    "TEMPEH": {
        "display_name": "tempeh",
        "translations": [
            "tempe"
        ]
    },
    "TOFU": {
        "display_name": "tofu",
        "translations": [
        ]
    },

    //MARK: ANIMAL PROTEINS
    "BACON": {
        "display_name": "bacon",
        "translations": [
        ]
    },
    "BLACK_FOREST_HAM": {
        "display_name": "black_forest_ham",
        "translations": [
        ]
    },
    "BEEF_BACK_RIBS": {
        "display_name": "beef back ribs",
        "translations": [

        ]
    },
    "BEEF_TENDERLOIN": {
        "display_name": "beef tenderloin",
        "translations": [
            "tenderloin beef"
        ]
    },
    "BEEF_MEDALLION": {
        "display_name": "beef tenderloin",
        "translations": [
            "tender medallions",
            "beef tender medallions",
            "shoulder tender medallions",
            "beef shoulder medallions",
            "beef shoulder tender medallions",
        ]
    },
    "BONE_IN_CHICKEN_BREAST": {
        "display_name": "bone-in chicken breast",
        "translations": [
            "bone-in chicken breasts"
        ]
    },
    "BONELESS_CHICKEN_BREAST": {
        "display_name": "chicken breast",
        "translations": [
            "chicken breasts"
        ]
    },
    "BONE_IN_CHICKEN_THIGH": {
        "display_name": "bone-in chicken thigh",
        "translations": [
            "bone-in chicken thighs"
        ]
    },
    "BONELESS_CHICKEN_THIGH": {
        "display_name": "chicken thigh",
        "translations": [
            "chicken thighs"
        ]
    },
    "BRATWURST": {
        "display_name": "bratwurst",
        "translations": [
        ]
    },
    "CHICKEN_TENDERLOIN" :{
        "display_name": "chicken tenderloin",
        "translations": [
            "chicken tender"
        ]
    },
    "CHICKEN" :{
        "display_name": "whole chicken",
        "translations": [
            "whole chicken"
        ]
    },
    "CHUCK_ROATS": {
        "display_name": "chuck roast",
        "translations": [
            "chuck roast steak"
        ]
    },
    "COWBOY_STEAK": {
        "display_name": "cowboy steak",
        "translations": [
        ]
    },
    "FILET_MIGNON": {
        "display_name": "filet mignon",
        "translations": [
        ]
    },
    "FLANK_STEAK": {
        "display_name": "flank steak",
        "translations": [
        ]
    },
    "GROUND_BEEF": {
        "display_name": "ground beef",
        "translations": [
        ]
    },  
    "GROUND_CHICKEN": {
        "display_name": "ground chicken",
        "translations": [
        ]
    },
    "GROUND_PORK": {
        "display_name": "ground pork",
        "translations": [
        ]
    },
    "GROUND_TURKEY": {
        "display_name": "ground beef",
        "translations": [
        ]
    },
    "HAM": {
        "display_name": "ham",
        "translations": [
            "spiral ham"
        ]
    },
    "PORK_CHOP": {
        "display_name": "pork chop",
        "translations": [
            "pork chops"
        ]
    },
    "PORK_BELLY": {
        "display_name": "pork belly",
        "translations": [
            
        ]
    },
    "PORK_RIBS": {
        "display_name": "pork ribs",
        "translations": [
            "rack of ribs"
        ]
    },
    "PORK_SHOULDER": {
        "display_name": "pork shoulder",
        "translations": [
        ]
    },
    "PORK_TENDERLOIN": {
        "display_name": "pork tenderloin",
        "translations": [
            
        ]
    },
    "PORTERHOUSE": {
        "display_name": "porterhouse steak",
        "translations": [
            "porter house steak",
            "porter hourse"
        ]
    },
    "ROAST_BEEF": {
        "display_name": "roast_beef",
        "translations": [
            "roast_beef_cold_cuts",
        ]
    },
    "RIB_FILET": {
        "display_name": "rib filet",
        "translations": [
            "rib filet steak",
            "beef rib filet"
        ]
    },
    "RIBEYE_ROAST": {
        "display_name": "ribeye roast",
        "translations": [
            "rib eye roast",
            "rib-eye roast"
        ]
    },
    "RIBEYE_STEAK": {
        "display_name": "ribeye steak",
        "translations": [
            "rib eye steak",
            "rib-eye steak"
        ]
    },
    "SAUSAGE" :{
        "display_name": "sausage",
        "translations": [
        ]
    },
    "SIRLOIN_STEAK": {
        "display_name": "sirloin steak",
        "translations": [
            "sirloin filet",
            "sirloin filet steak"
        ]
    },
    "T_BONE_STEAK": {
        "display_name": "T-Bone Steak",
        "translations": [
            "t bone steak",
            "tbone steak"
        ]
    },
    "TURKEY": {
        "display_name": "whole turkey",
        "translations": [
            "whole turkey"
        ]
    },
    // MARK: CONDIMENTS
    "DIJON_MUSTARD": {
        "display_name": "dijon mustard",
        "translations": [
        ]
    },
    "FISH_SAUCE": {
        "display_name": "fish sauce",
        "translations": [
        ]
    },
    "KIMCHI": {
        "display_name": "kimchi",
        "translations": [
        ]
    },
    "MALT_VINEGAR": {
        "display_name": "malt vinegar",
        "translations": [
        ]
    },
    "MAYONNAISE": {
        "display_name": "mayonnaise",
        "translations": [
            "mayo"
        ]
    },
    "SHAOXING_WINE": {
        "display_name": "shaoxing wine",
        "translations": [
            "shaoxing",
            "chinese cooking wine",
        ]
    },
    "SHERRY_VINEGAR": {
        "display_name": "sherry vinegar",
        "translations": [
            "spanish sherry vinegar",
        ]
    },
    "SOY_SAUCE": {
        "display_name": "soy sauce",
        "translations": [
        ]
    },
    "TARTAR_SAUCE": {
        "display_name": "tartar_sauce",
        "translations": [
        ]
    },
    "TOMATO_KETCHUP": {
        "display_name": "tomato ketchup",
        "translations": [
            "ketchup",
            "catsup",
        ]
    },
    "WORCHESTERSHIRE_SAUCE": {
        "display_name": "worchestershire sauce",
        "translations": [
        ]
    },
    "YELLOW_MUSTARD": {
        "display_name": "dijon mustard",
        "translations": [
        ]
    },
    // MARK: DRIED GOODS
    "ARBORIO_RICE": {
        "display_name":  "arborio rice",
        "translations": [
        ]
    },
    "BASMAT_RICE": {
        "display_name":  "basmati rice",
        "translations": [
        ]
    },
    "BRIOCHE_BREAD": {
        "display_name":  "brioche bread",
        "translations": [
        ]
    },
    "BREAD_CRUMB": {
        "display_name":  "bread crumbs",
        "translations": [
            "panko",
            "panko bread crumbs",
            "panko breading"
        ]
    },
    "GRANOLA" : {
        "display_name": "granola",
        "translations": [
        ]
    },
    "JAPANESE_SUSHI_RICE": {
        "display_name": "Japanese sushi rice",
        "translations": [
            "japanese rice",
            "sushi rice"
        ]
    },
    "JASMINE_RICE": {
        "display_name": "jasmine rice",
        "translations": [
        ]
    },
    "BROWN_JASMINE_RICE": {
        "display_name":  "brown jasmine rice",
        "translations": [
        ]
    },
    "QUINOA": {
        "display_name":  "quinoa",
        "translations": [
        ]
    },
    "SALAD_CROUTONS": {
        "display_name":  "salad croutons",
        "translations": [
            "croutons"
        ]
    },
    "SOURDOUGH_BREAD": {
        "display_name":  "sourdough bread",
        "translations": [
            "sour dough bread",
        ]
    },
    "WHOLE_WHEAT_BREAD": {
        "display_name":  "whole wheat bread",
        "translations": [
            "wholewheat bread",
            "whole-wheat bread",
            "whole grain bread"
        ]
    },
    "WHITE_BREAD": {
        "display_name":  "whole wheat bread",
        "translations": [
            "wholewheat bread",
            "whole-wheat bread",
        ]
    },
    "WHOLE_WHEAT_TORTILLA": {
        "display_name":  "whole wheat tortilla",
        "translations": [
            "wholewheat tortilla",
            "whole-wheat tortilla",
            "whole grain tortilla",
            "whole grain flour tortilla"
        ]
    },
    "WHITE_FLOUR_TORTILLA": {
        "display_name":  "white flour tortilla",
        "translations": [
            "flour tortilla",
            "white tortilla",
            "whole-flour tortilla"
        ]
    },

    // MARK: MISCELLANIOUS
    "CAPER": {
        "display_name": "capers",
        "translations": [
        ]
    },
    "BLACK_OLIVE": {
        "display_name": "green olives",
        "translations": [
        ]
    },
    "GREEN_OLIVE": {
        "display_name": "green olives",
        "translations": [
        ]
    },
};

const constants = {
    'ingredients': ingredientDatabase,
    'id': ID,
    'display_name': DISPLAY_NAME,
    'unit': UNIT,
    'quantity': QUANTITY
}
export default constants;