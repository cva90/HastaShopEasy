import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function AdminDashboard() {
  const navigate = useNavigate()
  const [totalProducts, setTotalProducts] = useState(0)
const [totalOrders, setTotalOrders] = useState(0)
useEffect(() => {
  fetch('http://localhost:5000/api/products')
    .then((response) => response.json())
    .then((data) => {
      setTotalProducts(data.length)
    })
    .catch((error) => {
      console.error('Error fetching products:', error)
    })

  fetch('http://localhost:5000/api/orders')
    .then((response) => response.json())
    .then((data) => {
      setTotalOrders(data.length)
    })
    .catch((error) => {
      console.error('Error fetching orders:', error)
    })
}, [])

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    navigate('/admin')
  }

  return (
    <main className="admin-dashboard">

      <div className="admin-dashboard-header">

        <div>
          <span className="admin-label">
            ADMIN PANEL
          </span>

          <h1>
            Welcome, Admin 👋
          </h1>

          <p>
            Manage your HastaShopEasy website.
          </p>
        </div>

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>


      <div className="admin-dashboard-cards">
        <div className="admin-dashboard-card">
  <div className="admin-card-icon">🛍️</div>

  <h2>{totalProducts}</h2>

  <p>Total Products</p>

  <Link
    to="/admin/products"
    className="admin-card-btn"
  >
    Manage Products →
  </Link>
</div>

        {/* ORDERS */}

        <div className="admin-dashboard-card">

          <div className="admin-card-icon">
            📦
          </div>

          <h2>
  {totalOrders}
</h2>

<p>
  Total Orders
</p>

          <Link
  to="/admin/orders"
  className="admin-card-btn"
>
  View Orders →
</Link>

        </div>


        {/* PRODUCTS */}

        <div className="admin-dashboard-card">

          <div className="admin-card-icon">
            🛍️
          </div>

          <h2>
  {totalProducts}
</h2>

          <p>
  Total Products
</p>

          <Link
            to="/products"
            className="admin-card-btn"
          >
            View Products →
          </Link>

        </div>


        {/* WEBSITE */}

        <div className="admin-dashboard-card">

          <div className="admin-card-icon">
            🌐
          </div>

          <h2>
            Website
          </h2>

          <p>
            Go back and view your online store.
          </p>

          <Link
            to="/"
            className="admin-card-btn"
          >
            Visit Website →
          </Link>

        </div>

      </div>

    </main>
  )
}

export default AdminDashboard