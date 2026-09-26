
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Checkout({ cart, totalPrice, clearCart }) {
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [placedTotal, setPlacedTotal] = useState(0)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    payment: 'Cash on Delivery',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  
const handleSubmit = async (e) => {
  e.preventDefault()

  const newOrderNumber =
    'HS' + Math.floor(100000 + Math.random() * 900000)

  const orderData = {
    orderNumber: newOrderNumber,

    customer: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
    },

    items: cart.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),

    totalPrice: totalPrice,

    payment: formData.payment,
  }

  try {
    const response = await fetch('https://hastashopeasy-ryw4.onrender.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.message || 'Failed to place order.')
      return
    }
      setPlacedTotal(totalPrice)
    setOrderNumber(newOrderNumber)

    clearCart()

    setOrderPlaced(true)

  } catch (error) {
    console.error('Order error:', error)
    alert('Unable to connect to the server.')
  }
}



  // ================= SUCCESS PAGE =================

  if (orderPlaced) {
    return (
      <main>
        <section className="checkout-page success-page">

          <div className="success-icon">
            ✓
          </div>

          <h1>Order Placed Successfully!</h1>

          <p className="success-message">
            Thank you for shopping with Hasta ShopEasy.
          </p>

          <p>
            Your order has been received successfully.
          </p>

          <div className="order-number">
            <span>Order Number</span>
            <strong>{orderNumber}</strong>
          </div>

          <p className="success-total">
  Order Total: <strong>₹{placedTotal.toLocaleString('en-IN')}</strong>
</p>

          <div className="success-actions">

            <Link
              to="/products"
              className="shop-btn"
            >
              Continue Shopping →
            </Link>

            <Link
              to="/"
              className="home-btn"
            >
              Back to Home
            </Link>

          </div>

        </section>
      </main>
    )
  }

  // ================= EMPTY CHECKOUT =================

  if (cart.length === 0) {
    return (
      <main>
        <section className="checkout-page empty-checkout">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h1>No Items to Checkout</h1>

          <p className="section-text">
            Please add products to your cart first.
          </p>

          <Link
            to="/products"
            className="shop-btn"
          >
            Browse Products →
          </Link>

        </section>
      </main>
    )
  }

  // ================= CHECKOUT PAGE =================

  return (
    <main>
      <section className="checkout-page">

        <h1>Checkout</h1>

        <p className="section-text">
          Enter your details to complete your order.
        </p>

        <div className="checkout-content">

          {/* CUSTOMER DETAILS */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <h2>Customer Details</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
  type="tel"
  name="phone"
  placeholder="Phone Number"
  value={formData.phone}
  onChange={handleChange}
  pattern="[6-9][0-9]{9}"
  maxLength="10"
  title="9342438683"
  required
/>

            <textarea
              name="address"
              rows="4"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>

            <div className="checkout-row">

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />

            </div>

            <h2>Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={
                  formData.payment === 'Cash on Delivery'
                }
                onChange={handleChange}
              />

              <span>Cash on Delivery</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={
                  formData.payment === 'UPI'
                }
                onChange={handleChange}
              />

              <span>UPI</span>
            </label>

            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order →
            </button>

          </form>

          {/* ORDER SUMMARY */}

          <div className="checkout-summary">

            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="checkout-item-info">

                  <h3>{item.name}</h3>

                  <p>
                    ₹{item.price.toLocaleString('en-IN')}
                    {' × '}
                    {item.quantity}
                  </p>

                </div>

                <strong>
                  ₹{(
                    item.price * item.quantity
                  ).toLocaleString('en-IN')}
                </strong>

              </div>
            ))}

            <hr />

            <div className="checkout-total">

              <span>Total</span>

              <strong>
                ₹{totalPrice.toLocaleString('en-IN')}
              </strong>

            </div>

          </div>

        </div>

      </section>
    </main>
  )
}

export default Checkout

