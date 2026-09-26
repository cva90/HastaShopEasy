
import { useEffect, useState } from 'react'
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Cart from './pages/Cart'
import Products from './pages/Products'
import Categories from './pages/Categories'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import AdminOrders from './pages/AdminOrders'
import Admin from './pages/Admin'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import ReturnRefund from './pages/ReturnRefund'
import OrderTracking from './pages/OrderTracking'

import './App.css'




function Home() {
  return (
    <main className="home-page">

      {/* HERO */}
      <section
        className="hero-section"
        style={{
          backgroundImage: "url('/image/shopping.png')"
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">

            <span className="hero-badge">
              ✨ Welcome to HastaShopEasy
            </span>

            <h1>
              Shop Smart.
              <br />
              <span>Live Better.</span>
            </h1>

            <p>
              Discover quality products at amazing prices.
              Shop your favorites from the comfort of your home.
            </p>

            <div className="hero-buttons">

              <Link to="/products" className="shop-now-btn">
                🛒 Shop Now
                <span>→</span>
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

            <div className="hero-mini-info">
              <div>
                <strong>500+</strong>
                <span>Happy Customers</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Quality Products</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Customer Support</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* TRUST FEATURES */}
      <section className="trust-section">

        <div className="trust-item">
          <div className="trust-icon">🚚</div>
          <div>
            <strong>Fast Delivery</strong>
            <span>2–5 Working Days</span>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon">🔒</div>
          <div>
            <strong>Secure Shopping</strong>
            <span>100% Safe & Secure</span>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon">📞</div>
          <div>
            <strong>24/7 Support</strong>
            <span>We're Here To Help</span>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon">💰</div>
          <div>
            <strong>Best Prices</strong>
            <span>Quality Products</span>
          </div>
        </div>

      </section>

    </main>
  )
}


/* ADMIN DASHBOARD */


  
function App() {
   const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('hasta-shop-cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [menuOpen, setMenuOpen] = useState(false)


  useEffect(() => {

    localStorage.setItem(
      'hasta-shop-cart',
      JSON.stringify(cart)
    )

  }, [cart])


  const addToCart = (product) => {

    setCart((currentCart) => {

      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )


      if (existingProduct) {

        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )

      }


      return [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ]

    })

  }


  const increaseQuantity = (id) => {

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )

  }


  const decreaseQuantity = (id) => {

    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )

  }


  const removeFromCart = (id) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    )

  }


  const clearCart = () => {
    setCart([])
  }


  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )


  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )


  const closeMenu = () => {
    setMenuOpen(false)
  }


  return (
    <div className="app">

      <header className="navbar">

        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          Hasta<span>ShopEasy</span>
        </Link>


        <nav className={menuOpen ? 'nav-open' : ''}>

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/products" onClick={closeMenu}>
            Products
          </Link>

          <Link to="/categories" onClick={closeMenu}>
            Categories
          </Link>

          <Link to="/about" onClick={closeMenu}>
            About
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>

          <Link
            to="/admin"
            className="admin-nav-link"
            onClick={closeMenu}
          >
            🔐 Admin
          </Link>


          <Link
            to="/cart"
            className="mobile-cart-link"
            onClick={closeMenu}
          >
            🛒 Cart ({totalItems})
          </Link>

        </nav>


        <Link
          to="/cart"
          className="cart-btn desktop-cart"
        >
          🛒 Cart ({totalItems})
        </Link>


        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

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
  path="/return-refund"
  element={<ReturnRefund />}
/>
<Route path="/track-order" element={<OrderTracking />} />

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
          path="/admin"
          element={<Admin />}
        />


        


       <Route
  path="/admin/orders"
  element={
    localStorage.getItem('adminLoggedIn') ? (
      <AdminOrders />
    ) : (
      <Navigate to="/admin" replace />
    )
  }
/>

<Route
  path="/admin/products"
  element={
    localStorage.getItem('adminLoggedIn') ? (
      <AdminProducts />
    ) : (
      <Navigate to="/admin" replace />
    )
  }
/>

        <Route
  path="/admin-dashboard"
  element={
    localStorage.getItem('adminLoggedIn') ? (
      <AdminDashboard />
    ) : (
      <Navigate to="/admin" replace />
    )
  }
/>
      </Routes>


      {cart.length > 0 && (

        <div className="floating-cart">

          <div className="floating-cart-info">

            <span className="floating-cart-icon">
              🛒
            </span>

            <div>

              <strong>
                {totalItems} item{totalItems > 1 ? 's' : ''}
              </strong>

              <small>
                ₹{totalPrice.toLocaleString('en-IN')}
              </small>

            </div>

          </div>


          <Link
            to="/cart"
            className="floating-view-cart"
          >
            View Cart
          </Link>


          <Link
            to="/checkout"
            className="floating-checkout"
          >
            Checkout →
          </Link>

        </div>

      )}


      <footer>

  <p>
    © 2026 Hasta ShopEasy. All Rights Reserved.
  </p>

  <div className="footer-links">
  <Link to="/privacy-policy">Privacy Policy</Link>
  <span>|</span>
  <Link to="/terms">Terms & Conditions</Link>
  <span>|</span>
  <Link to="/return-refund">Return & Refund Policy</Link>
</div>

</footer>

    </div>
  )
}


export default App

