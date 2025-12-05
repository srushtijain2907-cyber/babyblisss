// ---------------- LOGIN FUNCTIONALITY ----------------
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        alert("Please enter both email and password");
        return;
    }

    // Simple auth simulation
    localStorage.setItem("loggedInUser", email);
    alert("Login successful!");
    window.location.href = "index.html";
}

// ---------------- CART FUNCTIONALITY ----------------
let cart = [];

function addToCart(productName, price, image) {
    const product = {
        name: productName,
        price: price,
        image: image
    };

    cart.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cart));

    alert(productName + " added to cart!");
}

// Load cart items on cart page
function loadCart() {
    const cartContainer = document.getElementById("cartContainer");
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;
    cartItems.forEach(item => {
        total += item.price;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-img">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
        `;
        cartContainer.appendChild(div);
    });

    document.getElementById("totalAmount").textContent = "₹" + total;
}

// ---------------- DELIVERY FUNCTIONALITY ----------------
function placeOrder(event) {
    event.preventDefault();

    const name = document.getElementById("deliveryName").value;
    const address = document.getElementById("deliveryAddress").value;
    const phone = document.getElementById("deliveryPhone").value;

    if (name === "" || address === "" || phone === "") {
        alert("Please fill all delivery details");
        return;
    }

    alert("Order placed successfully!");
    localStorage.removeItem("cartItems");
    window.location.href = "index.html";
}

// ---------------- LOGOUT FUNCTION ----------------
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully");
    window.location.href = "login.html";
}
