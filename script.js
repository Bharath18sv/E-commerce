document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Shoe", price: 29.99 },
    { id: 2, name: "Headphone", price: 9.99 },
    { id: 3, name: "Laptop", price: 99.99 },
    { id: 4, name: "Watch", price: 39.99 },
  ];

  const productList = document.getElementById("products-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMsg = document.getElementById("empty-cart");
  const totalCart = document.getElementById("total-cart");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkoutBtn");

  const cartList = JSON.parse(localStorage.getItem("cart-items")) || [];
  displayCart();

  products.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}
        <button data-id='${product.id}'>Add to cart</button>
    `;
    productList.appendChild(div);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((products) => products.id === id);
      cartList.push(product);
      saveTasks();
      displayCart();
    }
  });

  function displayCart() {
    cartItems.textContent = "";
    let totalPrice = 0;
    console.log(cartList.length);

    if (cartList.length > 0) {
      cartItems.classList.remove("hidden");
      emptyCartMsg.classList.add("hidden");
      totalCart.classList.remove("hidden");
      checkOutBtn.classList.remove("hidden");
      cartList.forEach((item) => {
        totalPrice += item.price;
        const div = document.createElement("div");
        div.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button data-id="${item.id}">Remove</button>
            `;
        cartItems.appendChild(div);
        totalPriceDisplay.textContent = totalPrice.toFixed(2);
      });
    } else {
      console.log("length < 0");
      cartItems.classList.add("hidden");
      emptyCartMsg.classList.remove("hidden");
      totalCart.classList.add("hidden");
      totalPriceDisplay.textContent = "$0.00";
      checkOutBtn.classList.add("hidden");
    }
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const itemId = e.target.getAttribute("data-id");
      //   console.log(typeof itemId);

      const index = cartList.findIndex((item) => item.id == itemId);
      //   console.log(typeof index);

      console.log(index);

      if (index !== -1) {
        cartList.splice(index, 1);
      }
      displayCart();
      saveTasks();
    }
  });

  checkOutBtn.addEventListener("click", () => {
    cartList.length = 0;
    alert("The order has been checkout");
    displayCart();
    saveTasks();
  });

  function saveTasks() {
    localStorage.setItem("cart-items", JSON.stringify(cartList));
  }
});
