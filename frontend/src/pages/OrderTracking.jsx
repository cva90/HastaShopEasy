import { Link } from 'react-router-dom'
import { useState } from 'react'
function OrderTracking() {
    const [orderNumber, setOrderNumber] = useState('')
    const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleTrackOrder = async () => {
  if (!orderNumber.trim()) {
    setError('Please enter a valid order number.')
    setOrder(null)
    return
  }

  setLoading(true)
  setError('')
  setOrder(null)

  try {
    const response = await fetch(
      `https://hastashopeasy-ryw4.onrender.com/api/orders/track/${orderNumber.trim().toUpperCase()}`
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Order not found')
    }

    setOrder(data)
  } catch (error) {
    setError(error.message)
  } finally {
    setLoading(false)
  }
}
  return (
    <main className="order-tracking-page">
      <div className="order-tracking-container">

        <span>ORDER TRACKING</span>

        <h1>Track Your Order</h1>

        <p>
          Enter your order number to check your order status.
        </p>

        <div className="tracking-form">
         <input
  type="text"
  placeholder="Enter Order Number"
  value={orderNumber}
  onChange={(e) => setOrderNumber(e.target.value)}
/>

         <button onClick={handleTrackOrder} disabled={loading}>
  {loading ? 'Checking...' : 'Track Order'}
</button>
        {loading && (
          <p className="tracking-message">
            Checking your order...
          </p>
        )}

        {error && (
          <p className="tracking-error">
            {error}
          </p>
        )}

        {order && (
          <div className="tracking-result">

            <h2>Order Details</h2>

            <p>
              <strong>Order Number:</strong> {order.orderNumber}
            </p>

            <p>
              <strong>Status:</strong>{' '}
<span className={`status-badge ${order.status.toLowerCase()}`}>
  {order.status}
</span>
            </p>
            <div className="tracking-timeline">

  <div className="timeline-step completed">
    <div className="timeline-dot">✓</div>
    <span>Order Placed</span>
  </div>

  <div className={`timeline-line ${
    ['Processing', 'Shipped', 'Delivered'].includes(order.status)
      ? 'active'
      : ''
  }`}></div>

  <div className={`timeline-step ${
    ['Processing', 'Shipped', 'Delivered'].includes(order.status)
      ? 'completed'
      : ''
  }`}>
    <div className="timeline-dot">
      {['Processing', 'Shipped', 'Delivered'].includes(order.status) ? '✓' : '2'}
    </div>
    <span>Processing</span>
  </div>

  <div className={`timeline-line ${
    ['Shipped', 'Delivered'].includes(order.status)
      ? 'active'
      : ''
  }`}></div>

  <div className={`timeline-step ${
    ['Shipped', 'Delivered'].includes(order.status)
      ? 'completed'
      : ''
  }`}>
    <div className="timeline-dot">
      {['Shipped', 'Delivered'].includes(order.status) ? '✓' : '3'}
    </div>
    <span>Shipped</span>
  </div>

  <div className={`timeline-line ${
    order.status === 'Delivered'
      ? 'active'
      : ''
  }`}></div>

  <div className={`timeline-step ${
    order.status === 'Delivered'
      ? 'completed'
      : ''
  }`}>
    <div className="timeline-dot">
      {order.status === 'Delivered' ? '✓' : '4'}
    </div>
    <span>Delivered</span>
  </div>

</div>

            <p>
              <strong>Total:</strong> ₹{order.totalPrice.toLocaleString('en-IN')}
            </p>

            <p>
              <strong>Payment:</strong> {order.payment}
            </p>
            <p>
  <strong>Customer:</strong> {order.customer.name}
</p>

<p>
  <strong>City:</strong> {order.customer.city}
</p>
<div className="tracking-items">
  <h3>Items Ordered</h3>

  {order.items.map((item) => (
    <div className="tracking-item" key={item._id}>
      <p>
        <strong>Product:</strong> {item.name === 'teavel bag 1' ? 'Travel Bag' : item.name}
      </p>

      <p>
        <strong>Price:</strong> ₹{item.price.toLocaleString('en-IN')}
      </p>

      <p>
        <strong>Quantity:</strong> {item.quantity}
      </p>
    </div>
  ))}
</div>

          </div>
        )}
        </div>
        <Link to="/products" className="back-to-products">
  ← Continue Shopping
</Link>

      </div>
    </main>
  )
}

export default OrderTracking