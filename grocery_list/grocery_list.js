/**
 * Culina
 * Emily Kaufman
 * 
 * Usage:
 * -Users can add/strikethrough items from list
 *
 */

let sampleItems = ["apples", "chicken breast", "white rice", "eggs"];

window.onload = function() {
    displayItems();
}

/**
 * displayItems() Displays a user's grocery list
 * 
 * currently the array is populated with sample data 
 *      -Need to pull data from database
 * 
 */
function displayItems() {
    //query db 
    for(i=0; i<sampleItems.length; i++) {
        var li = document.createElement("li");
        var t = document.createTextNode(sampleItems[i]);
        li.id = "item" + i;
        li.classList = "unchecked";
        li.appendChild(t);
        document.getElementById("listItems").appendChild(li);
        li.addEventListener("click", function(){crossOut(event.target.id)});
    }
    createAddItemInput();
}

/**
 * createAddItemInput() implements the text box to add new items to the list
 * When enter is pressed, item gets added to the list using addItem()
 */
function createAddItemInput() {
    var list = document.getElementById("listItems");
    var newLi = document.createElement("li");
    var newItem = document.createElement("input");
    newItem.setAttribute("type","text");
    newItem.setAttribute("placeholder","New Item...");
    newItem.id = "newItem";

    newLi.appendChild(newItem);
    list.appendChild(newLi);

    document.getElementById("newItem").addEventListener("keypress", function(e) {
        if(e.key == "Enter") {
            var input = document.getElementById("newItem").value;
            addItem(input);
        }
    });

}

/**
 * addItem() pushed grocery item to the array of foods
 * Clears the list and re-displays -> might need to think of a 
 * better way to do this
 * -Once we connect to DB, add to DB instead of pushing to array
 */
function addItem (item) {
    sampleItems.push(item);
    clearList();
    displayItems();
}

/**
 * Completely clears the list
 * -Want to implement that if the LI is "checked", clearList() removes
 *  the item from the database so when the items are re-displayed, the
 *  crossed out items do not show up
 */
function clearList() {
    document.getElementById("listItems").innerHTML = "";
    for(i=0; i<sampleItems.length; i++) {
        // remove item from database
    }
}

/**
 * crossOut() strikesthrough an item when clicked
 */
function crossOut(id) {
    var item = document.getElementById(id);
    item.classList = "checked";
}
