// Placing our variables in the global scope so we can access them in multiple functions

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
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
    // Create variable to store the event.value and materialize the li with createElement();
    const li = document.createElement('li');
    // Inserts the new created li into the DOM
    //              takes the value from newItem and places its content into the new li
    li.appendChild(document.createTextNode(newItem));
    // Button being created and passing in the classes so the styles render properly
    const button = createButton('remove-item btn-link text-red');
    // Appending the li to the button from createButton Function
    li.appendChild(button);
    // Adding the new item to the DOM
    itemList.appendChild(li);
    // Clearing the input
    itemInput.value = '';
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

// Event Listeners usually at the bottom and functions in the middle
itemForm.addEventListener('submit', addItem);


