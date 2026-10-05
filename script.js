/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "AeroSound Pro Headphones",
        category: "Electronics",
        price: 4999,
        rating: 4.8,
        reviews: 126,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
        description:
            "Premium wireless headphones with deep bass, active noise cancellation and all-day comfort."
    },

    {
        id: 2,
        name: "Urban X Smart Watch",
        category: "Electronics",
        price: 3299,
        rating: 4.6,
        reviews: 89,
        image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
        description:
            "Modern smartwatch with health tracking, notifications and a bright edge-to-edge display."
    },

    {
        id: 3,
        name: "Classic Leather Sneakers",
        category: "Fashion",
        price: 2799,
        rating: 4.7,
        reviews: 214,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        description:
            "Premium everyday sneakers designed for comfort and modern streetwear."
    },

    {
        id: 4,
        name: "Minimal Travel Backpack",
        category: "Fashion",
        price: 1899,
        rating: 4.5,
        reviews: 73,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
        description:
            "Water-resistant backpack with laptop protection and organized compartments."
    },

    {
        id: 5,
        name: "Ceramic Table Lamp",
        category: "Home",
        price: 1599,
        rating: 4.4,
        reviews: 56,
        image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
        description:
            "Warm ambient lighting with a refined ceramic body for modern interiors."
    },

    {
        id: 6,
        name: "Mechanical Keyboard",
        category: "Electronics",
        price: 4499,
        rating: 4.9,
        reviews: 318,
        image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
        description:
            "Tactile mechanical keyboard designed for developers, creators and gamers."
    },

    {
        id: 7,
        name: "Everyday Cotton Hoodie",
        category: "Fashion",
        price: 1699,
        rating: 4.6,
        reviews: 142,
        image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
        description:
            "Soft heavyweight cotton hoodie with a clean relaxed fit."
    },

    {
        id: 8,
        name: "Nordic Lounge Chair",
        category: "Home",
        price: 7499,
        rating: 4.8,
        reviews: 41,
        image:
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80",
        description:
            "Contemporary lounge chair that brings comfort and character to any room."
    }

];


/* ================= STATE ================= */

let cart =
    JSON.parse(
        localStorage.getItem("shopsphere-cart")
    ) || [];

let orders =
    JSON.parse(
        localStorage.getItem("shopsphere-orders")
    ) || [];

let currentCategory = "All";


/* ================= ELEMENTS ================= */

const productGrid =
    document.getElementById("productGrid");

const cartPanel =
    document.getElementById("cartPanel");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const searchInput =
    document.getElementById("searchInput");

const ordersPage =
    document.getElementById("ordersPage");

const ordersList =
    document.getElementById("ordersList");

const modal =
    document.getElementById("productModal");

const productDetails =
    document.getElementById("productDetails");

const toastBox =
    document.getElementById("toast");


/* ================= MONEY ================= */

function money(value) {

    return "₹" +
        value.toLocaleString("en-IN");

}


/* ================= SAVE ================= */

function saveData() {

    localStorage.setItem(
        "shopsphere-cart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "shopsphere-orders",
        JSON.stringify(orders)
    );

}


/* ================= RENDER PRODUCTS ================= */

function renderProducts(list = products) {

    productGrid.innerHTML = "";

    if (list.length === 0) {

        productGrid.innerHTML = `
      <p style="
        grid-column:1/-1;
        text-align:center;
        padding:60px;
        color:#777;
      ">
        No products found.
      </p>
    `;

        return;
    }


    list.forEach(product => {

        productGrid.innerHTML += `

      <article
        class="product-card"
        onclick="openProduct(${product.id})"
      >

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
          >

        </div>


        <div class="product-info">

          <span class="category">
            ${product.category}
          </span>

          <h3>
            ${product.name}
          </h3>

          <div class="rating">
            ★★★★★

            <span>
              ${product.rating}
              (${product.reviews})
            </span>
          </div>

          <div class="price">
            ${money(product.price)}
          </div>

          <button
            class="add-button"
            onclick="
              event.stopPropagation();
              addToCart(${product.id})
            "
          >
            Add to Cart
          </button>

        </div>

      </article>

    `;

    });

}


/* ================= ADD CART ================= */

function addToCart(id) {

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: id,

            quantity: 1

        });

    }


    saveData();

    updateCart();

    showToast("Product added to cart 🛒");

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent = count;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
      <p style="
        text-align:center;
        color:#777;
        margin-top:50px;
      ">
        Your cart is empty.
      </p>
    `;

        cartTotal.textContent = "₹0";

        return;
    }


    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );


        total +=
            product.price *
            item.quantity;


        cartItems.innerHTML += `

      <div class="cart-row">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div>

          <h4>
            ${product.name}
          </h4>

          <strong>
            ${money(product.price)}
          </strong>

          <div class="qty">

            <button
              onclick="
                changeQuantity(
                  ${product.id},
                  -1
                )
              "
            >
              −
            </button>

            ${item.quantity}

            <button
              onclick="
                changeQuantity(
                  ${product.id},
                  1
                )
              "
            >
              +
            </button>

          </div>

        </div>

        <button
          class="remove"
          onclick="
            removeFromCart(${product.id})
          "
        >
          🗑️
        </button>

      </div>

    `;

    });


    cartTotal.textContent =
        money(total);

}


/* ================= QUANTITY ================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveData();

    updateCart();

}


/* ================= REMOVE ================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveData();

    updateCart();

    showToast("Product removed");


}


/* ================= SHOW CART ================= */

function showCart() {

    cartPanel.classList.add("open");

    updateCart();

}


/* ================= CLOSE CART ================= */

function closeCart() {

    cartPanel.classList.remove("open");

}


/* ================= PRODUCT DETAILS ================= */

function openProduct(id) {

    const product =
        products.find(
            product => product.id === id
        );


    productDetails.innerHTML = `

    <div class="product-detail">

      <img
        src="${product.image}"
        alt="${product.name}"
      >

      <div>

        <span class="category">
          ${product.category}
        </span>

        <h2>
          ${product.name}
        </h2>

        <div class="rating">
          ★★★★★
          ${product.rating}
          •
          ${product.reviews}
          reviews
        </div>

        <h2>
          ${money(product.price)}
        </h2>

        <p>
          ${product.description}
        </p>

        <button
          class="primary-btn"
          onclick="
            addToCart(${product.id});
            closeModal();
          "
        >
          Add to Cart
        </button>

      </div>

    </div>

  `;


    modal.classList.remove("hidden");

}


/* ================= CLOSE MODAL ================= */

function closeModal() {

    modal.classList.add("hidden");

}


modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            closeModal();

        }

    }
);


/* ================= SEARCH ================= */

function searchProducts() {

    const query =
        searchInput.value
            .toLowerCase()
            .trim();


    const results =
        products.filter(product => {

            const text =
                product.name +
                " " +
                product.category +
                " " +
                product.description;

            return text
                .toLowerCase()
                .includes(query);

        });


    showHome();

    renderProducts(results);

}


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchProducts();

        }

    }
);


/* ================= CATEGORY FILTER ================= */

document
    .querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter")
                    .forEach(
                        b =>
                            b.classList.remove(
                                "active"
                            )
                    );


                button.classList.add("active");


                currentCategory =
                    button.dataset.category;


                if (
                    currentCategory === "All"
                ) {

                    renderProducts(products);

                } else {

                    renderProducts(
                        products.filter(
                            product =>
                                product.category ===
                                currentCategory
                        )
                    );

                }

            }
        );

    });


/* ================= HOME ================= */

function showHome() {

    ordersPage.classList.add("hidden");

    document
        .getElementById("products")
        .classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (
        currentCategory === "All"
    ) {

        renderProducts(products);

    } else {

        renderProducts(
            products.filter(
                p =>
                    p.category ===
                    currentCategory
            )
        );

    }

}


/* ================= ORDERS ================= */

function showOrders() {

    closeCart();

    document
        .getElementById("products")
        .classList.add("hidden");

    ordersPage.classList.remove("hidden");


    if (orders.length === 0) {

        ordersList.innerHTML = `

      <div class="order">

        <strong>
          No orders yet.
        </strong>

        <p style="color:#777;margin-top:8px">

          Add products to your cart
          and place your first order.

        </p>

      </div>

    `;

        return;

    }


    ordersList.innerHTML = "";


    [...orders]
        .reverse()
        .forEach(order => {

            ordersList.innerHTML += `

        <div class="order">

          <div class="order-header">

            <strong>
              Order #${order.id}
            </strong>

            <span class="status">
              ● ${order.status}
            </span>

          </div>

          <p
            style="
              color:#777;
              margin-top:10px
            "
          >

            ${order.date}
            •
            ${order.items.length}
            products
            •
            <strong>
              ${money(order.total)}
            </strong>

          </p>


          <div class="order-items">

            ${order.items
                    .map(item => {

                        const product =
                            products.find(
                                p =>
                                    p.id === item.id
                            );

                        return `

                  <span class="order-item">

                    ${product.name}
                    ×
                    ${item.quantity}

                  </span>

                `;

                    })
                    .join("")}

          </div>

        </div>

      `;

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty"
        );

        return;

    }


    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );

        total +=
            product.price *
            item.quantity;

    });


    const newOrder = {

        id:
            "SS" +
            Date.now()
                .toString()
                .slice(-7),

        date:
            new Date()
                .toLocaleString(),

        items: [...cart],

        status: "Confirmed",

        total: total

    };


    orders.push(newOrder);

    cart = [];


    saveData();

    updateCart();

    closeCart();

    showToast(
        "Order placed successfully 🎉"
    );


    setTimeout(
        showOrders,
        700
    );

}


/* ================= TOAST ================= */

function showToast(message) {

    toastBox.textContent =
        message;

    toastBox.classList.add(
        "show"
    );


    setTimeout(
        () =>
            toastBox.classList.remove(
                "show"
            ),
        1800
    );

}


/* ================= INITIALIZE ================= */

renderProducts();

updateCart();