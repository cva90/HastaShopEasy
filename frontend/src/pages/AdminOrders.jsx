import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminOrders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetch('https://hastashopeasy-ryw4.onrender.com/api/orders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching orders:', error)
        setLoading(false)
      })
  }, [])

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
  `https://hastashopeasy-ryw4.onrender.com/api/orders/${orderId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Status update failed')
        return
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      )

      if (selectedOrder?._id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus,
        })
      }
    } catch (error) {
      console.error('Status update error:', error)
      alert('Failed to update status')
    }
  }

  if (loading) {

    return (
      <div className="admin-orders-page">
        <h2>Loading orders...</h2>
      </div>
    )
  }

  const totalSales = orders.reduce(
    (total, order) => total + Number(order.totalPrice || 0),
    0
  )

  const pendingOrders = orders.filter(
    (order) => order.status === 'Pending'
  ).length

  const deliveredOrders = orders.filter(
    (order) => order.status === 'Delivered'
  ).length

  const filteredOrders =
  statusFilter === 'All'
    ? orders
    : orders.filter((order) => order.status === statusFilter)

    const ordersPerPage = 5

const startIndex = (currentPage - 1) * ordersPerPage
const currentOrders = filteredOrders.slice(
  startIndex,
  startIndex + ordersPerPage
)

  return (
    <main className="admin-orders-page">

      <div className="admin-orders-header">

  <div>
    <span>ADMIN PANEL</span>
    <h1>Customer Orders</h1>
    <p>View and manage all customer orders.</p>
  </div>

  <div className="order-filters">
  <button onClick={() => setStatusFilter('All')}>
    All Orders
  </button>

<button
  onClick={() => {
    setStatusFilter('Processing')
    setCurrentPage(1)
  }}
>
  Processing
</button>

<button
  onClick={() => {
    setStatusFilter('Shipped')
    setCurrentPage(1)
  }}
>
  Shipped
</button>

  <button onClick={() => setStatusFilter('Pending')}>
    Pending
  </button>

  <button onClick={() => setStatusFilter('Delivered')}>
    Delivered
  </button>

  <button onClick={() => setStatusFilter('Cancelled')}>
    Cancelled
  </button>
</div>

  <div className="admin-orders-actions">

    <Link
      to="/admin-dashboard"
      className="admin-dashboard-btn"
    >
      ← Dashboard
    </Link>

    <button
      className="admin-orders-logout-btn"
      onClick={() => {
        localStorage.removeItem('adminLoggedIn')
        navigate('/admin')
      }}
    >
      🚪 Logout
    </button>

  </div>

</div>

      <div className="admin-summary-cards">

        <div className="admin-summary-card">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="admin-summary-card">
          <span>Total Sales</span>
          <strong>
            ₹{totalSales.toLocaleString('en-IN')}
          </strong>
        </div>

        <div className="admin-summary-card">
          <span>Pending Orders</span>
          <strong>{pendingOrders}</strong>
        </div>

        <div className="admin-summary-card">
          <span>Delivered Orders</span>
          <strong>{deliveredOrders}</strong>
        </div>

      </div>

      {orders.length === 0 ? (

        <div className="no-orders">
          <h2>No Orders Found</h2>
          <p>Customer orders will appear here.</p>
        </div>

      ) : (

        <div className="orders-table-wrapper">

          <table className="orders-table">

            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            
              <tbody>
  {currentOrders.map((order) => (
              

                <tr key={order._id}>

                  <td>
                    <strong>{order.orderNumber}</strong>
                  </td>

                  <td>
                    {order.customer?.name || 'N/A'}
                  </td>

                  <td>
                    ₹{Number(order.totalPrice || 0).toLocaleString('en-IN')}
                  </td>

                  <td>
                    {order.payment || 'N/A'}
                  </td>

                  <td>

                    <select
                      value={order.status || 'Pending'}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="admin-status-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                  </td>

                  <td>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString('en-IN')}
                  </td>

                  <td>
                    <button
                      className="admin-view-btn"
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                    >
                      View
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

         <div className="orders-pagination">
  <button onClick={() => setCurrentPage(1)}>1</button>

  <button onClick={() => setCurrentPage(2)}>2</button>

  <button onClick={() => setCurrentPage(3)}>3</button>
</div>

        </div>

      )}

      {selectedOrder && (

        <div
          className="order-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >

          <div
            className="order-details-box"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="order-details-top">

              <div>
                <span>ORDER DETAILS</span>
                <h2>{selectedOrder.orderNumber}</h2>
              </div>

              <button
                className="order-close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>

            </div>

            <div className="order-info-section">

              <h3>Customer Information</h3>

              <p>
                <strong>Name:</strong>{' '}
                {selectedOrder.customer?.name || 'N/A'}
              </p>

              <p>
                <strong>Email:</strong>{' '}
                {selectedOrder.customer?.email || 'N/A'}
              </p>

              <p>
                <strong>Phone:</strong>{' '}
                {selectedOrder.customer?.phone || 'N/A'}
              </p>

              <p>
                <strong>Address:</strong>{' '}
                {selectedOrder.customer?.address || 'N/A'}
              </p>

              <p>
                <strong>City:</strong>{' '}
                {selectedOrder.customer?.city || 'N/A'}
              </p>

              <p>
                <strong>Pincode:</strong>{' '}
                {selectedOrder.customer?.pincode || 'N/A'}
              </p>

            </div>

            <div className="order-info-section">

              <h3>Ordered Products</h3>

              {selectedOrder.items?.map((item, index) => (

                <div
                  className="admin-product-row"
                  key={index}
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <strong>
                    ₹{Number(item.price || 0).toLocaleString('en-IN')}
                  </strong>
                </div>

              ))}

            </div>

            <div className="order-payment-section">

              <p>
                <strong>Payment:</strong>{' '}
                {selectedOrder.payment || 'N/A'}
              </p>

              <p>
                <strong>Total:</strong>{' '}
                ₹{Number(
                  selectedOrder.totalPrice || 0
                ).toLocaleString('en-IN')}
              </p>

              <p>
                <strong>Status:</strong>{' '}
                {selectedOrder.status || 'Pending'}
              </p>

            </div>

            <button
              className="order-bottom-close"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </main>
  )
}

export default AdminOrders