// Placing our variables in the global scope so we can access them in multiple functions
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');




function onAddItemSubmit(e) {
    // Preventing page reload in submit
    e.preventDefault();
    // Storing the value of the input in a variable
    const newItem = itemInput.value;
    // Validate Input
    // must see the vaule property so use .value
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
    //              takes the value from the passed in argument item and places its content into the new li
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
    // creating the icons element
    const icon = document.createElement('i');
    // assigning class name
    icon.className = classes;
    // returning the icon
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

// Function for removing items from the shopping list
function removeItem(e) {
    // Passing in the class name so it can be deleted
    if (e.target.parentElement.classList.contains('remove-item')) {
        // traversing the dom to parent element of the button to remove the li.
        // Alerts for delete confirmation.
        if (window.confirm('Are you sure you want to delete?')) {
            e.target.parentElement.parentElement.remove();
            // removes clear and filter fields
            checkUI();
        }
    }
}

// Function for clearing the whole items list
function clearItems(e) {
    // using while loop to protect errors and clear button visibility
    while (itemList.firstChild) {
        // using remove child of the ul keeping ul element intact
        itemList.removeChild(itemList.firstChild);
    }
    // hides the clear button and filter input
    checkUI();
}

function filterItems(e) {
    // gives access to the li items to search
    const items = itemList.querySelectorAll('li');
    // gets the text being typed 
    const text = e.target.value.toLowerCase();

    // iterating through the current list of items to find a match
    items.forEach(item => {
        // grabbing the first child in the li which is a text node
        const itemName = item.firstChild.textContent.toLowerCase();
        // compairing the filter text with current items in the li to display
        if (itemName.indexOf(text) != -1) {
            // displays item if match found 
            item.style.display = 'flex';
        } else {
            // display none iif no match found
            item.style.display = 'none';
        }
    });
}

// Function for clearing the li list items in the ul
function checkUI(e) {
    // Clears the list items. Passing in itemList since it ID is the parent element
    const items = itemList.querySelectorAll('li');
    // if list is null
    if (items.length === 0) {
        // hides the filter input and clear button
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        // style if items are listed 
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}





// Event Listeners usually at the bottom and functions in the middle

itemForm.addEventListener('submit', onAddItemSubmit);
// For Removing and clearing individual list items
itemList.addEventListener('click', removeItem);
// For the clear button functionality
clearButton.addEventListener('click', clearItems);
// For filtering li items
itemFilter.addEventListener('input', filterItems);



// invoked on page load.
checkUI();