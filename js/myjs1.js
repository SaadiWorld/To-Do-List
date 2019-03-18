// First we will select all the elements
const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const itemList = document.querySelector('.item-list');
const clearBtn = document.getElementById('clear-list');
const feedback = document.querySelector('.feedback');

// let itemData = [];         // Without Local Storage

let itemData = JSON.parse(localStorage.getItem('list')) || []; //When using Local Storage

if (itemData.length > 0) {
    itemData.forEach(function (singleitem) { // BEFOREND inserts Just inside the element, after its last child
        itemList.insertAdjacentHTML("beforeend",
            `<div class="item my-3">
            <h5 class="item-name text-capitalize">${singleitem}</h5>
            <div class="item-icons">
            <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
            <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
            <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
            </div>
        </div>`);
        handleItem(singleitem);
    });
}

// Form Submission
itemForm.addEventListener('submit', function (event) {
    event.preventDefault();             // Preventing Page Load

    const textValue = itemInput.value;

    if (textValue === '') {
        showFeedback('Please Enter a Valid Value', 'danger');
    }
    else {
        // Adding the item
        addItem(textValue);

        // Clearing the input bar
        itemInput.value = "";

        // Adding to Item Array
        itemData.push(textValue);

        // Local Storage
        localStorage.setItem('list', JSON.stringify(itemData));

        // Adding Event Listeners to Icons
        handleItem(textValue);
    }

})

// Show Feedback Function
function showFeedback(text, action) {    // Action means Class
    feedback.classList.add('showItem', `alert-${action}`); //Adding a class
    feedback.innerHTML = `<p>${text}</p>`;
    setTimeout(function () {
        feedback.classList.remove('showItem', `alert-${action}`);
    }, 3000);
}

// Adding Item Function
function addItem(value) {
    const div = document.createElement('div');

    div.classList.add('item', 'my-3');
    div.innerHTML = `<h5 class="item-name text-capitalize">${value}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`;
    itemList.appendChild(div);
}

function handleItem(textValue) {
    const items = itemList.querySelectorAll('.item');
    //console.log(items);
    items.forEach(function (item) {
        if (item.querySelector('.item-name').textContent === textValue) {

            // Complete Event Listener
            item.querySelector('.complete-item').addEventListener('click', function () {
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
                //In an event, THIS refers to the element that received the event
            });

            // Edit Event Listener
            item.querySelector('.edit-item').addEventListener('click', function () {
                itemInput.value = textValue;
                itemList.removeChild(item);

                itemData = itemData.filter(function (item) {
                    return item !== textValue;
                });
                localStorage.setItem('list', JSON.stringify(itemData));
            });

            // Delete Event Listener
            item.querySelector('.delete-item').addEventListener('click', function () {
                itemList.removeChild(item);

                itemData = itemData.filter(function (item) {
                    return item !== textValue;
                });
                localStorage.setItem('list', JSON.stringify(itemData));
                showFeedback('The Item is Deleted!', 'success');
            });
        }
    });
}

clearBtn.addEventListener('click', function () {
    itemData = [];
    localStorage.removeItem('list');
    const items = itemList.querySelectorAll('.item');
    if (items.length > 0) {
        items.forEach(function (item) {
            itemList.removeChild(item);
        });
    }
}); 