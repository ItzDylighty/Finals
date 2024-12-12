/*open and close sa gilid*/
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");


menuOpenButton.addEventListener("click", () =>{
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());


let cart = [];
let total = 0.00;

function toggleCartDropdown() {
    let dropdown = document.getElementById('cart-dropdown');
    dropdown.classList.toggle('visible');
}


function addToCart(itemName, itemPrice) {
    let price = parseFloat(itemPrice.replace('₱', '').replace(',', ''));

    let existingItemIndex = cart.findIndex(item => item.name === itemName);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity++;
        cart[existingItemIndex].totalPrice = cart[existingItemIndex].quantity * price;
    } else {
        let newItem = {
            name: itemName,
            price: price,
            quantity: 1,
            totalPrice: price
        };
        cart.push(newItem);
    }

    updateCart();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    cart[index].totalPrice += cart[index].price;
    total += cart[index].price;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        cart[index].totalPrice -= cart[index].price;
        total -= cart[index].price;
        updateCart();
    }
}

function removeFromCart(index) {
    let removedItem = cart[index];

    total -= removedItem.totalPrice;

    cart.splice(index, 1);

    updateCart();
}


function updateCart() {
    let cartItemsElement = document.getElementById('cart-items');
    let cartTotalElement = document.getElementById('cart-total');
    cartItemsElement.innerHTML = '';
    total = 0.00; 
    cart.forEach((item, index) => {
        total += item.totalPrice; 
        let listItem = document.createElement('li');
        listItem.classList.add('cart-item');
        
        let itemName = document.createElement('span');
        itemName.classList.add('cart-item-name');
        itemName.textContent = item.name;

        let itemPrice = document.createElement('span');
        itemPrice.classList.add('cart-item-price');
        itemPrice.textContent = `₱${item.totalPrice.toFixed(2)}`;

        listItem.appendChild(itemName);
        listItem.appendChild(itemPrice);
        
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        
        let decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.classList.add('nav-btn');
        decreaseButton.onclick = () => decreaseQuantity(index);
        
        let increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.classList.add('nav-btn');
        increaseButton.onclick = () => increaseQuantity(index);
        
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('nav-btn');
        removeButton.onclick = () => removeFromCart(index);

        buttonContainer.appendChild(decreaseButton);
        buttonContainer.appendChild(increaseButton);
        buttonContainer.appendChild(removeButton);

        listItem.appendChild(buttonContainer);
        
        cartItemsElement.appendChild(listItem);
    });
    cartTotalElement.textContent = `₱${total.toFixed(2)}`;
}


let addButtons = document.querySelectorAll('.cart-box');
addButtons.forEach(button => {
    button.addEventListener('click', function () {
        let menuItem = button.parentElement;
        let itemName = menuItem.querySelector('.name').textContent;
        let itemPrice = menuItem.querySelector('.price').textContent;

        addToCart(itemName, itemPrice);
    });
});


const checkoutButton = document.getElementById('checkout-button');
const checkoutModal = document.getElementById('checkout-modal');
const modalCloseButton = document.getElementById('modal-close');

function checkout() {
    let totalPriceElement = document.getElementById('modal-total-price');
    
    totalPriceElement.textContent = `₱${total.toFixed(2)}`;

    checkoutModal.style.display = 'block';


    cart = [];
    total = 0.00;
    updateCart();
}

modalCloseButton.addEventListener('click', function () {
    checkoutModal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
});

checkoutButton.addEventListener('click', checkout);


