"use strict";

const productListContainer = document.querySelector(".product-items-container");
const cartSection = document.querySelector(".shopping-cart");
const totalPriceContainer = document.createElement("div");
totalPriceContainer.setAttribute("class", "total-price-container");

let quantity = 0;
const shoppingCartItems = {};

// Fetch Data
async function fetchProductData() {
  const url = "data.json";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status ${response.status}`);
    }

    const apiResponse = await response.json();

    return apiResponse;
  } catch (error) {
    console.error(error);
  }
}

// Load  Products
async function loadProducts() {
  const productData = await fetchProductData();
  updateProductList(productData);
}

loadProducts();

// To Update Product List
function updateProductList(data) {
  const renderProductCard = data
    .map((item, index) => {
      return `
    <div class='product-card' data-name='${item.name}'
    data-price='${item.price}' data-img='${item.image.thumbnail}'>

          <div class='product-image-wrap'>
    <picture>
            <source media='(min-width:1024px)' srcset='${item.image.desktop}'>
            <source media='(min-width:950px)' srcset='${item.image.tablet}'>
            <source media='(max-width:700px)' srcset='${item.image.mobile}'>
            <img src='${item.image.desktop}' alt='${item.name}'
    class='product-image'/>

    </picture>

    <div class='cta-button'>

    <button class='add-to-cart-btn'>
        <img src='assets/images/icon-add-to-cart.svg' alt='cart-icon'/>
        Add to Cart
    </button>

    <div class='incre-decre-grp'>

    <button class='decrement-btn'>
        <img src='assets/images/icon-decrement-quantity.svg' alt='-' class='e-icon'/>
    </button>

    <span class='quantity-count'></span>

    <button class='increment-btn'>
        <img src='assets/images/icon-increment-quantity.svg' alt='+' class='e-icon'/>
    </button>

      </div>
            </div>

    </div>
        <div class='product-content'>

        <p class='product-category'>${item.category}</p>
          <h3 class='product-name'>${item.name}</h3>
            <p class='product-price'>$${(+item.price).toFixed(2)}</p>

        </div>
    </div>
    `;
    })
    .join("");
  productListContainer.innerHTML = renderProductCard;

  handleAddToCart();
}

function queryElements() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const quantityControls = document.querySelectorAll(".incre-decre-grp");
  const quantityCounts = document.querySelectorAll(".quantity-count");
  const productItems = Array.from(document.querySelectorAll(".product-card"));
  const productImages = productItems.map((element) => {
    return element.firstElementChild.children[0].lastElementChild;
  });

  return {
    productItems,
    addToCartButtons,
    quantityControls,
    quantityCounts,
    productImages,
  };
}

function handleAddToCart() {
  const {
    productItems,
    addToCartButtons,
    quantityControls,
    quantityCounts,
    productImages,
  } = queryElements();

  addToCartButtons.forEach((btn, index) => {
    btn.addEventListener("click", function (e) {
      const itemName = productItems[index].dataset.name;
      const itemPrice = productItems[index].dataset.price;
      const itemImage = productItems[index].dataset.img;

      if (!this.classList.contains("rotate-main")) {
        this.classList.add("rotate-main");
        quantityControls[index].classList.add("rotate-sib");
        quantity = 1;
        productImages[index].classList.add("active");

        updateCountValue(quantityCounts, index, quantity);
        checkAndUpdateCart(itemName, itemPrice, itemImage);
      }
      displayCartContents(shoppingCartItems);
    });
  });

  handleCountChange({
    quantityControls,
    productItems,
    addToCartButtons,
    productImages,
    quantityCounts,
  });

  function handleCountChange({
    quantityControls,
    productItems,
    addToCartButtons,
    productImages,
    quantityCounts,
  }) {
    quantityControls.forEach((div, index) => {
      div.addEventListener("click", function (e) {
        const incrementBtn = e.target.classList.contains("increment-btn");
        const decrementBtn = e.target.classList.contains("decrement-btn");
        const itemName = productItems[index].dataset.name;

        if (incrementBtn) {
          shoppingCartItems[itemName].count++;
          updateCountValue(
            quantityCounts,
            index,
            shoppingCartItems[itemName].count
          );
        } else if (decrementBtn) {
          if (shoppingCartItems[itemName].count > 0) {
            shoppingCartItems[itemName].count--;
            updateCountValue(
              quantityCounts,
              index,
              shoppingCartItems[itemName].count
            );
          }
          if (shoppingCartItems[itemName].count === 0) {
            productImages[index].classList.remove("active");
            addToCartButtons[index].classList.remove("rotate-main");
            quantityControls[index].classList.remove("rotate-sib");

            delete shoppingCartItems[itemName];
            updateCountValue(quantityCounts, index, 0);
          }
        } else {
          return;
        }
        displayCartContents(shoppingCartItems);
      });
    });
  }
}

function checkAndUpdateCart(productName, productprice, cartItemImage) {
  if (!shoppingCartItems[productName]) {
    shoppingCartItems[productName] = {
      name: productName,
      price: productprice,
      img: cartItemImage,
      count: 1,
    };
  }
}

function updateCountValue(element, index, cartItemCount) {
  element[index].textContent = cartItemCount;
}

function productCounts(items) {
  const count = Object.values(items)
    .map((item) => item.count)
    .reduce((acc, curr) => acc + curr, 0);
  return count;
}

function displayCartContents(cartItemsParameter) {
  const cartItemsList = cartItemsParameter;
  const cartContainer = document.querySelector(".shopping-cart-content");
  const cartQuantityTotal = document.querySelector(".cart-total-count");

  cartQuantityTotal.textContent = productCounts(cartItemsList);

  function loadCartItemsIntoContainer() {
    const displayCartItems = Object.values(cartItemsList)
      .map((items, index) => {
        return `
        <div class='cart-item'>

        <div class='cart-item-content'>
              <p class='cart-item-name'>${items.name}</p>

        <div class='flex-row'>

              <p class='cart-item-count'>${items.count}x</p>
              <p class='cart-item-price'>@ $${(+items.price).toFixed(2)}</p>
              <p class='cart-item-total-price'>
        $${(+items.count * (+items.price).toFixed(2)).toFixed(2)}
        </p>
        </div>
        
              </div>

        <button class='remove-item'>
                <img src='assets/images/icon-remove-item.svg'/>
        </button>

        </div>
      `;
      })
      .join("");

    return displayCartItems;
  }

  function updateCartContainer() {
    cartContainer.innerHTML = loadCartItemsIntoContainer();
  }

  updateCartContainer();
  displayOrderSummary(cartItemsList);
}

function calculateTotal(cartItemsParameter) {
  const totalPrice = Object.values(cartItemsParameter)
    .map((value, index) => {
      const price = Number(value.price);
      const total = value.count * price;

      return total;
    })
    .reduce((acc, curr) => acc + curr, 0);

  return (+totalPrice).toFixed(2);
}

function displayOrderSummary(currentCartItems) {
  const cartItemsList = currentCartItems;
  const cartItemOrder = [];

  for (const products in cartItemsList) {
    cartItemOrder.push(cartItemsList[products]);
  }
  const priceTotal = calculateTotal(cartItemsList);

  function renderTotalContainer() {
    totalPriceContainer.innerHTML = `
    <div class='total-summary-container'>

        <p class='total-summary-title'>Order Total </p>
            <p class='total-amount'>$${priceTotal}</p>
    </div>
    
    <div class='delivery-details'>
        <img src='assets/images/icon-carbon-neutral.svg' alt='carbon-netural'/>
        
        <p class='delivery-message'>This is a <strong>carbon-neutral</strong>delivery</p>
        
    </div>
    
    <button class='place-order-button'>Confirm Order</button>`;

    cartSection.insertAdjacentElement("beforeend", totalPriceContainer);
  }

  renderTotalContainer();

  function removeItemFromCart() {
    const removeItemButton = document.querySelectorAll(".remove-item");
    const cartItemsArray = document.querySelectorAll(".cart-item");

    removeItemButton.forEach((button, index) => {
      button.addEventListener("click", function (e) {
        const itemName =
          cartItemsArray[index].querySelector(".cart-item-name").textContent;

        if (cartItemsList[itemName]) {
          cartItemsList[itemName].count = 0;
          delete cartItemsList[itemName];
        }

        cartItemsArray[index].style.display = "none";

        updateCartAfterRemoval();
        displayOrderSummary(cartItemsList);
        displayCartContents(cartItemsList);
      });
    });
  }

  function updateCartAfterRemoval() {
    const total = calculateTotal(cartItemsList);
    const {
      productItems,
      addToCartButtons,
      quantityControls,
      quantityCounts,
      productImages,
    } = queryElements();

    productItems.forEach((item, index) => {
      const itemName = item.dataset.name;
      if (!cartItemsList[itemName]) {
        addToCartButtons[index].classList.remove("rotate-main");
        quantityControls[index].classList.remove("rotate-sib");
        productImages[index].classList.remove("active");
        updateCountValue(quantityCounts, index, 0);
      }
    });

    const totalPriceElement = document.querySelector(".total-amount");
    if (totalPriceElement) {
      totalPriceElement.textContent = `$${total}`;
    }
  }

  resetCart(cartItemsList);
  removeItemFromCart();
  handleOrderCheckout(cartItemsList);
}

function resetCart(currentCartItems) {
  const cartContainer = document.querySelector(".shopping-cart-content");
  const isEmptyCart = Object.values(currentCartItems).every(
    (item) => item.count === 0
  );

  if (isEmptyCart) {
    cartContainer.innerHTML = `<div class="empty-cart-wrap">
                <img
                  src="assets/images/illustration-empty-cart.svg"
                  alt="Empty Cart"
                  class="empty-cart-img"
                />

                <p>Your added items will be appear here</p>
              </div>`;
    totalPriceContainer.style.display = "none";
  } else {
    totalPriceContainer.style.display = "block";
  }
}

function handleOrderCheckout(itemsInCart) {
  const cartItemsCollection = itemsInCart;
  const orderItemsContainer = document.querySelector(".order-items-list");
  const orderTotalAmount = document.querySelector(".order-total");
  const total = calculateTotal(cartItemsCollection);
  const confirmOrderButton = document.querySelector(".place-order-button");
  const orderConfirmationModal = document.querySelector(
    ".order-confirmation-modal"
  );
  const bgOverlay = document.querySelector(".bg-overlay");

  const displayOrderItems = Object.values(cartItemsCollection)
    .map((item) => {
      return `
    
    <div class='order-item'>
    
      <img src='${item.img}' src='${
        item.name
      } thumbail' class='product-thumbnail' />
      
      <div class='product-info'>
          <h3 class='product-title'>
                ${item.name}  </h3>
                
                <div class='product-summary'>
                  <p class='item-quantity'>${item.count}x</p>
                  <p class='item-price'>@ $${(+item.price).toFixed(2)}</p>
                  </div>
                  
      </div>
      
          <p class='product-total-price'>
          $${(+item.count * (+item.price).toFixed(2)).toFixed(2)}</p>
          
          </div>`;
    })
    .join("");

  orderTotalAmount.textContent = `$${total}`;
  orderItemsContainer.innerHTML = displayOrderItems;

  function attachConfirmOrderEvent() {
    confirmOrderButton.addEventListener("click", function (e) {
      if (!orderConfirmationModal.classList.contains("show-modal")) {
        orderConfirmationModal.classList.add("show-modal");
        bgOverlay.classList.add("show-overlay");
      }
    });
  }

  attachConfirmOrderEvent();

  function initiateNewOrderProcess() {
    const {
      productItems,
      addToCartButtons,
      quantityControls,
      quantityCounts,
      productImages,
    } = queryElements();
    const cartQuantityTotal = document.querySelector(".cart-total-count");

    orderConfirmationModal.addEventListener("click", function (e) {
      const newOrderButton = e.target.classList.contains("start-new-btn");

      if (newOrderButton) {
        for (let i = 0; i < addToCartButtons.length; i++) {
          addToCartButtons[i].classList.remove("rotate-main");
          quantityControls[i].classList.remove("rotate-sib");
          productImages[i].classList.remove("active");
        }

        for (const items in cartItemsCollection) {
          delete cartItemsCollection[items];
        }

        orderConfirmationModal.classList.remove("show-modal");
        bgOverlay.classList.remove("show-overlay");
        cartQuantityTotal.textContent = "0";
        resetCart(cartItemsCollection);
      } else {
        return;
      }
    });
  }

  initiateNewOrderProcess();
}
