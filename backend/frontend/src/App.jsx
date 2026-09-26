import { useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'

import Cart from './pages/Cart'
import Products from './pages/Products'
import Categories from './pages/Categories'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import AdminOrders from './pages/AdminOrders'
import AdminProducts from './pages/AdminProducts'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'

import './App.css'

function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">

            <span className="hero-badge">
              ✨ Welcome to HastaShopEasy
            </span>

            <h1>
              Shop Smart.
              <br />
              Live Better.
            </h1>

            <p>
              Discover quality products at amazing prices.
              Shop your favorite products from the comfort of your home.
            </p>

            <div className="hero-buttons">
              <Link to="/products" className="shop-now-btn">
                🛒 Shop Now →
              </Link>

              <a
                href="https://wa.me/919342438683"
                target="_blank"
                rel="noreferrer"
                className="whatsapp-btn"
              >
                💬 WhatsApp Us
              </a>
            </div>

          </div>
        </div>
      </section>

      <section className="trust-section">

        <div className="trust-item">
          <strong>🚚 Fast Delivery</strong>
          <span>2–5 Working Days</span>
        </div>

        <div className="trust-item">
          <strong>🔒 Secure Shopping</strong>
          <span>100% Safe</span>
        </div>

        <div className="trust-item">
          <strong>📞 24/7 Support</strong>
          <span>We're Here To Help</span>
        </div>

        <div className="trust-item">
          <strong>💰 Best Prices</strong>
          <span>Quality Products</span>
        </div>

      </section>
    </main>
  )
}

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('hastaCart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('hastaCart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item._id === product._id
      )

      if (existingProduct) {
        return currentCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ]
    })
  }

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== id)
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalPrice = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  )

  return (
    <>
      <header className="navbar">

        <div className="logo">
          Hasta<span>ShopEasy</span>
        </div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin/orders">Admin</Link>
          <Link to="/admin/products">Products Admin</Link>
        </nav>

        <Link to="/cart" className="cart-link">
          🛒 Cart ({cart.length})
        </Link>

      </header>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={
            <Products
              cart={cart}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
              totalPrice={totalPrice}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              totalPrice={totalPrice}
              clearCart={clearCart}
            />
          }
        />

        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />

        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />

      </Routes>

      <footer className="site-footer">

        <div className="footer-links">

          <Link to="/privacy-policy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

        </div>

        <p>
          © 2026 Hasta ShopEasy. All Rights Reserved.
        </p>

      </footer>

    </>
  )
}

export default App