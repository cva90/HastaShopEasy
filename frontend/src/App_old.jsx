import { useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 2999,
    image: '/image/headphones.png',
    category: 'Electronics',
    description:
      'Premium wireless headphones with clear sound and comfortable design.',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 3999,
    image: '/image/smartwatch.png',
    category: 'Electronics',
    description:
      'Modern smart watch with stylish design and useful features.',
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 2499,
    image: '/image/runningshoe.png',
    category: 'Fashion',
    description:
      'Comfortable running shoes designed for everyday activity.',
  },
  {
    id: 4,
    name: 'Travel Bag',
    price: 1999,
    image: '/image/travelbag.png',
    category: 'Travel',
    description:
      'Spacious and stylish travel bag for your journeys.',
  },
]

function App() {
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState(false)

  const categories = ['All', 'Electronics', 'Fashion', 'Travel']

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        )

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      )

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const selectCategory = (category) => {
    setSelectedCategory(category)

    setTimeout(() => {
      document
        .getElementById('products')
        ?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const checkout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add a product first.')
      return
    }

    setCheckoutMessage(true)
  }

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <div className="logo">
          Hasta<span>ShopEasy</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <button
          className="cart-btn"
          onClick={() => setCartOpen(true)}
        >
          🛒 Cart ({totalItems})
        </button>
      </header>

      {/* ================= HERO ================= */}

      <section
        id="home"
        className="hero-section"
      >
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-badge">
            ✨ Welcome to Hasta ShopEasy
          </span>

          <h1>
            Shop Smart.
            <br />
            <span>Live Better.</span>
          </h1>

          <p>
            Discover quality products at affordable prices.
            Easy shopping, great products and a better
            shopping experience.
          </p>

          <a href="#products" className="shop-btn">
            Shop Now →
          </a>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}

      <section id="products" className="products-section">
        <h2>Featured Products</h2>

        <p className="section-text">
          Explore our popular products
        </p>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>

              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="product-info">

                <span className="category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <p className="price">
                  ₹{product.price}
                </p>

                <div className="product-buttons">

                  <button
                    className="view-btn"
                    onClick={() =>
                      setSelectedProduct(product)
                    }
                  >
                    View
                  </button>

                  <button
                    className="add-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section
        id="categories"
        className="categories-section"
      >
        <h2>Shop By Category</h2>

        <p className="section-text">
          Choose a category to explore products
        </p>

        <div className="category-grid">

          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? 'category-item active'
                  : 'category-item'
              }
              onClick={() => selectCategory(category)}
            >
              {category === 'All' && '🛍️'}
              {category === 'Electronics' && '🎧'}
              {category === 'Fashion' && '👟'}
              {category === 'Travel' && '🧳'}

              <span>{category}</span>
            </button>
          ))}

        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section id="about" className="about-section">
        <h2>About Hasta ShopEasy</h2>

        <p>
          Hasta ShopEasy is a modern e-commerce platform
          designed to provide quality products with a simple,
          fast and enjoyable shopping experience.
        </p>
      </section>

      {/* ================= CONTACT ================= */}

      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>

        <p>
          Email: support@hastashopeasy.com
        </p>

        <p>
          Phone: +91 93424 38683
        </p>
      </section>

      {/* ================= FOOTER ================= */}

      <footer>
        <p>
          © 2026 Hasta ShopEasy. All Rights Reserved.
        </p>
      </footer>

      {/* ================= PRODUCT MODAL ================= */}

      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <div className="modal-info">

              <span className="category">
                {selectedProduct.category}
              </span>

              <h2>
                {selectedProduct.name}
              </h2>

              <h3>
                ₹{selectedProduct.price}
              </h3>

              <p>
                {selectedProduct.description}
              </p>

              <button
                className="modal-cart-btn"
                onClick={() => {
                  addToCart(selectedProduct)
                  setSelectedProduct(null)
                  setCartOpen(true)
                }}
              >
                🛒 Add to Cart
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= CART ================= */}

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="cart-panel"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cart-header">
              <h2>Your Cart</h2>

              <button
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (

              <div className="empty-cart">

                <div>🛒</div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add some products to your cart.
                </p>

              </div>

            ) : (

              <>

                <div className="cart-items">

                  {cart.map((product) => (

                    <div
                      className="cart-item"
                      key={product.id}
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <div className="cart-item-info">

                        <h4>
                          {product.name}
                        </h4>

                        <p>
                          ₹{product.price}
                        </p>

                        <div className="quantity-control">

                          <button
                            onClick={() =>
                              decreaseQuantity(product.id)
                            }
                          >
                            −
                          </button>

                          <span>
                            {product.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(product.id)
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="cart-total">
                  <span>Total</span>

                  <strong>
                    ₹{total}
                  </strong>
                </div>

                <button
                  className="checkout-btn"
                  onClick={checkout}
                >
                  Proceed to Checkout →
                </button>

              </>
            )}

          </div>
        </div>
      )}

      {/* ================= CHECKOUT ================= */}

      {checkoutMessage && (
        <div
          className="modal-overlay"
          onClick={() =>
            setCheckoutMessage(false)
          }
        >

          <div
            className="checkout-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Checkout Ready!
            </h2>

            <p>
              Your order total is
            </p>

            <h3>
              ₹{total}
            </h3>

            <p className="checkout-note">
              Checkout/payment integration can be
              connected next.
            </p>

            <button
              className="modal-cart-btn"
              onClick={() =>
                setCheckoutMessage(false)
              }
            >
              Continue Shopping
            </button>

          </div>

        </div>
      )}

    </div>
  )
}

export default App