// =========================
// SHOPPING CART
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ADD TO CART
function addToCart(productName, productPrice) {

    const existingProduct = cart.find(
        product => product.name === productName
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    updateCartDisplay();

    alert(productName + " added to cart!");
}


// UPDATE CART COUNT
function updateCartCount() {

    const cartButton =
        document.querySelector(".nav-actions button");

    if (!cartButton) return;

    const totalQuantity = cart.reduce(
        (total, product) => total + product.quantity,
        0
    );

    cartButton.innerHTML =
        "🛒 Cart (" + totalQuantity + ")";
}


// OPEN CART
function openCart() {

    const cartPanel =
        document.getElementById("cartPanel");

    if (!cartPanel) return;

    cartPanel.classList.add("active");

    updateCartDisplay();
}


// CLOSE CART
function closeCart() {

    const cartPanel =
        document.getElementById("cartPanel");

    if (!cartPanel) return;

    cartPanel.classList.remove("active");
}


// UPDATE CART DISPLAY
function updateCartDisplay() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent = "0";

        return;
    }


    cart.forEach((product, index) => {

        const subtotal =
            product.price * product.quantity;

        total += subtotal;


        const item =
            document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div>

                <h4>${product.name}</h4>

                <p>₹${product.price}</p>

                <div class="quantity-control">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>${product.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">

                Remove

            </button>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent = total;
}


// INCREASE QUANTITY
function increaseQuantity(index) {

    if (!cart[index]) return;

    cart[index].quantity++;

    saveCart();
    updateCartCount();
    updateCartDisplay();
}


// DECREASE QUANTITY
function decreaseQuantity(index) {

    if (!cart[index]) return;

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    saveCart();
    updateCartCount();
    updateCartDisplay();
}


// REMOVE PRODUCT
function removeFromCart(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    saveCart();
    updateCartCount();
    updateCartDisplay();
}


// SAVE CART
function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// =========================
// PRODUCT SEARCH
// =========================

function searchProducts() {

    const searchInput =
        document.getElementById("productSearch");

    if (!searchInput) return;

    const searchText =
        searchInput.value.toLowerCase().trim();

    const products =
        document.querySelectorAll(".product-card");

    let found = false;


    products.forEach(product => {

        const productName =
            product.querySelector("h3")?.textContent.toLowerCase() || "";

        const productDescription =
            product.querySelector("p")?.textContent.toLowerCase() || "";

        const productText =
            productName + " " + productDescription;


        if (productText.includes(searchText)) {

            product.style.display = "";

            found = true;

        } else {

            product.style.display = "none";
        }

    });


    showNoResultMessage(found);
}


// =========================
// CATEGORY FILTER
// =========================

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");

    let found = false;


    products.forEach(product => {

        const productCategory =
            product.getAttribute("data-category");


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "";

            found = true;

        } else {

            product.style.display = "none";
        }

    });


    showNoResultMessage(found);
}


// NO RESULT MESSAGE
function showNoResultMessage(found) {

    let noResult =
        document.getElementById("noResult");


    if (!found) {

        if (!noResult) {

            noResult =
                document.createElement("p");

            noResult.id = "noResult";

            noResult.textContent =
                "No products found.";

            noResult.style.textAlign = "center";
            noResult.style.marginTop = "20px";
            noResult.style.color = "#777";


            document
                .querySelector(".product-container")
                .appendChild(noResult);
        }

    } else {

        if (noResult) {
            noResult.remove();
        }
    }
}


// =========================
// PRODUCT DETAILS MODAL
// =========================

function viewProduct(productName, productPrice) {

    const modal =
        document.getElementById("productModal");

    if (!modal) return;


    const productDescriptions = {

        "Wireless Headphones":
            "Premium sound quality with comfortable design.",

        "Smart Watch":
            "Smart features with stylish modern design.",

        "Running Shoes":
            "Lightweight and comfortable shoes for daily use.",

        "Travel Backpack":
            "Durable backpack perfect for travel and everyday use."
    };


    document
        .getElementById("modalProductName")
        .textContent = productName;


    document
        .getElementById("modalProductDescription")
        .textContent =
        productDescriptions[productName] || "";


    document
        .getElementById("modalProductPrice")
        .textContent =
        "₹" + productPrice.toLocaleString("en-IN");


    document
        .getElementById("modalCartButton")
        .onclick = function () {

            addToCart(productName, productPrice);

            closeProductModal();
        };


    modal.classList.add("active");
}


// CLOSE PRODUCT MODAL
function closeProductModal() {

    const modal =
        document.getElementById("productModal");

    if (!modal) return;

    modal.classList.remove("active");
}


// =========================
// CHECKOUT MODAL
// =========================

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    const checkoutModal =
        document.getElementById("checkoutModal");

    if (!checkoutModal) return;

    checkoutModal.classList.add("active");
}


// CLOSE CHECKOUT
function closeCheckout() {

    const checkoutModal =
        document.getElementById("checkoutModal");

    if (!checkoutModal) return;

    checkoutModal.classList.remove("active");
}


// =========================
// PAGE LOAD
// =========================

updateCartCount();
updateCartDisplay();
// =========================
// PLACE ORDER
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const checkoutForm =
        document.getElementById("checkoutForm");

    if (!checkoutForm) return;

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("customerName").value.trim();

        if (!name) return;

        

document.getElementById("successModal").style.display = "flex";

        cart = [];

        saveCart();
        updateCartCount();
        updateCartDisplay();

        closeCheckout();

        checkoutForm.reset();

    });

});
function closeSuccessModal() {

    const successModal =
        document.getElementById("successModal");

    if (!successModal) return;

    successModal.classList.remove("active");
}
// =========================
// MOBILE MENU
// =========================
function toggleMenu() {
    const menu = document.getElementById("mobileMenu");

    if (menu) {
        menu.classList.toggle("active");
    }
}
// Close mobile menu when a link is clicked

document.querySelectorAll("#mobileMenu a").forEach(link => {

    link.addEventListener("click", function () {

        document
            .getElementById("mobileMenu")
            .classList.remove("active");

    });

});