// ================= LOADER =================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});

// ================= CART SYSTEM =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

cartBtn.onclick = () => cartDrawer.classList.add("active");
closeCart.onclick = () => cartDrawer.classList.remove("active");

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = total;
  cartCount.textContent = cart.length;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);

    cart.push({ name, price });
    updateCart();
  });
});

updateCart();

// ================= SHOP NOW SCROLL =================
document.getElementById("shopNowBtn").addEventListener("click", () => {
  document.getElementById("collection").scrollIntoView({ behavior: "smooth" });
});

// ================= CHECKOUT =================
document.getElementById("checkoutForm").addEventListener("submit", e => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price, 0),
    date: new Date().toLocaleString()
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order placed successfully!");
  cart = [];
  updateCart();
});

// ================= CONTACT FORM =================
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Message sent successfully!");
});

// ================= NEWSLETTER =================
document.getElementById("subscribeBtn").addEventListener("click", () => {
  alert("Subscribed successfully!");
});
