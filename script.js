// Placing our variables in the global scope so we can access them in multiple functions
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
// For edit functionality
const formBtn = itemForm.querySelector('.btn');
// For editing items in the li
let isEditMode = false;




// function for localstorage to maintain itself in the DOM. At upper most level since it needs top be loaded first
function displayItems() {
    const itemsFromStorage = getItemsFromLocalStorage();

    // forEach to add items to the DOM.
    itemsFromStorage.forEach(item => addItemToDOM(item));
}



// Function for add item input field 
function onAddItemSubmit(e) {
    // Preventing page reload in submit
    e.preventDefault();
    // Storing the value of the input in a variable
    const newItem = itemInput.value;
    // Validate Input
    // Must see the vaule property so use .value
    if (newItem === '') {
        // Alerts User of empty input Field
        alert('Please fill in item to be added');
        // Stops furture code execution
        return;
    }

    // Created DOM element
    addItemToDOM(newItem);

    // Add item to LS
    addItemToStorage(newItem);

    checkUI();
    // Clearing the input
    itemInput.value = '';
}

// Function for adding newly created li items to DOM ul element
function addItemToDOM(item) {
    // Create variable to store the event.value and materialize the li with createElement();
    const li = document.createElement('li');
    // Inserts the new created li into the DOM
    //              Takes the value from the passed in argument item and places its content into the new li
    li.appendChild(document.createTextNode(item));
    // Button being created and passing in the classes so the styles render properly
    const button = createButton('remove-item btn-link text-red');
    // Appending the li to the button from createButton Function
    li.appendChild(button);
    // Adding the new li item to the DOM
    itemList.appendChild(li);
}


function createButton(classes) {
    // Creating the button
    const button = document.createElement('button');
    // Giving button class name
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    // Appending icon into the button
    button.appendChild(icon);
    return button;
}


function createIcon(classes) {
    // Creating the icons element
    const icon = document.createElement('i');
    // Assigning class name
    icon.className = classes;
    // Returning the icon
    return icon;
}

// Function for adding newly created li items to localStoreage
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromLocalStorage();


    // Add new item to array
    itemsFromStorage.push(item);

    // Convert to JSON string and set in localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


function getItemsFromLocalStorage() {
    let itemsFromStorage;

    // Checks if there are items already stored in LS
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickItem(e) {

    if (e.target.parentElement.classList.contains('remove-item')) {
        // Removes the parent of the parentElement which is the li in the ul
        removeItem(e.target.parentElement.parentElement);
    } else {
        // Targets the li in the ul
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    // Setting the edit mode to true
    isEditMode = true;
    // Changes style once clicked
    item.classList.add('edit-mode');
    //
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item'
    formBtn.style.backgroundColor = 'green'
    // Passing textContent to the input field for editing
    itemInput.value = item.textContent;
    localStorage.setItem('item')


}

// Function for removing items from the shopping list
function removeItem(item) {
    if (confirm('Are you sure you want to delete?')) {
        // Removes the selected item from DOM
        item.remove();
        // Remove item from, storage
        removeItemFromStorage(item.textContent);
        // Checks is list items are available if so shows clear button if not hides it.
        checkUI();
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromLocalStorage();


    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // Re-set Local Storege
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Function for clearing the whole items list
function clearItems(item) {
    // Using while loop to protect errors and clear button visibility
    while (itemList.firstChild) {
        // using remove child of the ul keeping ul element intact
        itemList.removeChild(itemList.firstChild);
    }

    // Clear from localStorage
    localStorage.removeItem('items');

    // Hides the clear button and filter input
    checkUI();
}

function filterItems(e) {
    // Gives access to the li items to search
    const items = itemList.querySelectorAll('li');
    // Gets the text being typed 
    const text = e.target.value.toLowerCase();

    // Iterating through the current list of items to find a match
    items.forEach(item => {
        // Grabbing the first child in the li which is a text node
        const itemName = item.firstChild.textContent.toLowerCase();
        // Compairing the filter text with current items in the li to display
        if (itemName.indexOf(text) != -1) {
            // Displays item if match found 
            item.style.display = 'flex';
        } else {
            // Display none if no match found
            item.style.display = 'none';
        }
    });
}

// Function for clearing the li list items in the ul
function checkUI(e) {
    // Clears the list items. Passing in itemList since it ID is the parent element
    const items = itemList.querySelectorAll('li');
    // If list is null
    if (items.length === 0) {
        // Hides the filter input and clear button
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        // Style if items are listed 
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}



// Initialize App IIFE Function for page load add functions ass needed
function init() {
    // Event Listeners usually at the bottom and functions in the middle
    itemForm.addEventListener('submit', onAddItemSubmit);
    // For Removing and clearing individual list items
    itemList.addEventListener('click', onClickItem);
    // For the clear button functionality
    clearButton.addEventListener('click', clearItems);
    // For filtering li items
    itemFilter.addEventListener('input', filterItems);
    // Event for page load to 
    document.addEventListener('DOMContentLoaded', displayItems);
    // Invoked on page load.
    checkUI();
}

// Invoking function for page
init();