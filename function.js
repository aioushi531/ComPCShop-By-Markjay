import { products } from './products.js';
//PARA SA HOME PAGE

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navlist.classList.toggle('open');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navlist.classList.remove('open');
};

//PARA SA TEAM IMAGE SLIDER
const container = document.querySelector('.container');

if (container) {
  container.addEventListener('click', (event) => {
    const panel = event.target.closest('.panel');
    if (panel) {
      removeActiveClasses();
      panel.classList.add('active');
    }
  });
}

function removeActiveClasses() {
  const panels = document.querySelectorAll('.panel');
  panels.forEach((panel) => panel.classList.remove('active'));
}

// PARA SA PRODUCT PAGE

const productExist = document.querySelector('.products');

if (productExist) {
  const createProductCard = (product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-cards');
    productDiv.innerHTML = `
      <img loading="lazy" src="${product.image}" alt="${product.name}"> 
      <h3>${product.name} ${product.specs === 'none' ? '' : `(${product.specs})`}</h3>
      <p>${product.description}</p> 
      <span>Price: ₱${product.onSale ? `${(product.price * 0.9).toFixed(2)} <del>${product.price.toFixed(2)}</del>` : `${product.price.toFixed(2)}`} <em>${product.quantity}</em></span> 
      <div class="button"> 
        <button data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    return productDiv;
  };

  const displayProducts = (filteredProducts = products) => {
    const productSection = document.querySelector('.products');
    productSection.innerHTML = '';
    filteredProducts.forEach((product) => productSection.appendChild(createProductCard(product)));
    attachAddToCartListeners();
  };

  const attachAddToCartListeners = () => {
    document.querySelectorAll('button[data-id]').forEach((button) => {
      button.addEventListener('click', function () {
        const productId = parseInt(this.dataset.id);
        const product = products.find((p) => p.id === productId);
        if (product) {
          window.alert('🎉 Item Added to Cart! 🛒');
          addToCart(product);
        }
      });
    });
  };

  displayProducts();

  document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('change', () => {
      const category =
        button.id === 'All'
          ? products
          : products.filter((product) =>
              button.id === 'pcparts' ? product.category === 'pcparts' : button.id === 'pcbuilds' ? product.category === 'pcbuilds' : button.id === 'processors' ? product.category === 'processors' :  button.id === 'gcards' ? product.category === 'gcards' :  button.id === 'lappy' ? product.category === 'lappy' : button.id === 'Sale' ? product.onSale : null
            );
      displayProducts(category);
    });
  });

  document.querySelector('.searchBar').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(query) || product.specs.toLowerCase().includes(query));
    displayProducts(filteredProducts);
  });
}

//PARA SA CART MODAL

const modal = document.querySelector('#cartModal');
const closeModal = document.querySelector('#close');
const showModal = document.querySelector('#cart-icon');

showModal.addEventListener('click', () => {
  modal.showModal();
});

closeModal.addEventListener('click', () => {
  modal.close();
});

//PARA SA CART FUNCTIONS
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

const saveCartToLocalStorage = () => {
  sessionStorage.setItem('cart', JSON.stringify(cart));
};

const updateCartDisplay = () => {
  const items = document.querySelector('#items');
  items.textContent = '';

  if (cart.length === 0) {
    items.innerHTML = `
      <h1>Oops, Your Shopping Cart is Empty</h1>
      <h2>browse our awesome deals now!</h2>
      <h2><a id="shoplink" href="products.html">Go shopping NOW!</a></h2>
    `;
    document.querySelector('#total').textContent = 'Total: ₱0.00';
    return;
  }

  let totalAmount = 0;

  cart.forEach(({ product, quantity }) => {
    totalAmount += product.onSale === true ? quantity * (product.price * product.onSale) : product.price * quantity;

    const productDiv = document.createElement('div');
    productDiv.classList.add('cart-items');
    productDiv.innerHTML = `
      <img id="cartImg" loading="lazy" src="${product.image}" alt="${product.name}">
      <div class="cart-details">
      <h3>${product.name}</h3>
      <span>Price: ₱${product.onSale ? `${(product.price * 0.9).toFixed(2)}` : `${product.price.toFixed(2)}`}</span>
      <label for="q">Quantity:</label>
      <input type="number" id="q" name="quantity" value="${quantity}" min="1" data-id="${product.id}" class="quantity-input">
      </div>
      <svg class="remove-btn"  data-id="${product.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
      </svg>
    `;
    items.appendChild(productDiv);
  });

  document.querySelector('#total').textContent = `Total: ₱${totalAmount.toFixed(2)}`;

  // PARA MAG UPDATE NG MGA QUANTITIES AT MAG HANDLE NG REMOVE BUTTON NGGA
  document.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('input', (event) => {
      const inputQuantity = parseInt(event.target.value);
      const productId = parseInt(event.target.dataset.id);

      if (inputQuantity < 1) {
        removeFromCart(productId);
      } else {
        const cartItem = cart.find((item) => item.product.id === productId);
        if (cartItem) {
          cartItem.quantity = inputQuantity;
        }
      }

      saveCartToLocalStorage();
      updateCartDisplay();
    });
  });

  document.querySelectorAll('.remove-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = parseInt(event.target.dataset.id);
      removeFromCart(productId);
    });
  });
};

// FUNCTION PARA SA ADD NG ITEM PAPUNTANG CART
const addToCart = (product) => {
  const existingProduct = cart.find((item) => item.product.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  saveCartToLocalStorage();
  updateCartDisplay();
};

const removeFromCart = (productId) => {
  cart = cart.filter((item) => item.product.id !== productId);
  saveCartToLocalStorage();
  updateCartDisplay();
};

updateCartDisplay();

const order = document.getElementById('place-order');
const checkoutModal = document.getElementById('checkoutModal');

order.addEventListener('click', (event) => {
  event.preventDefault();
  if (cart.length === 0) {
    alert('Your cart is empty!');
    modal.close();
  } else {
    checkoutModal.showModal();
    modal.close();
  }
});

