import { useState } from 'react'
function OrderTracking() {
    const [orderNumber, setOrderNumber] = useState('')
    const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleTrackOrder = async () => {
  if (!orderNumber.trim()) {
    setError('Please enter your order number.')
    setOrder(null)
    return
  }

  setLoading(true)
  setError('')
  setOrder(null)

  try {
    const response = await fetch(
      `https://hastashopeasy-ryw4.onrender.com/api/orders/track/${orderNumber.trim()}`
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

         <button onClick={handleTrackOrder}>
  Track Order
</button>
        </div>

      </div>
    </main>
  )
}

export default OrderTracking