import { useEffect, useState } from 'react'

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    rating: '',
    description: '',
    image: '',
  })

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products')
      const data = await response.json()

      if (response.ok) {
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      stock: '',
      rating: '',
      description: '',
      image: '',
    })

    setEditingProduct(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const productData = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        rating: Number(formData.rating || 0),
        description: formData.description,
        image: formData.image,
      }

      const url = editingProduct
        ? `http://localhost:5000/api/products/${editingProduct._id}`
        : 'http://localhost:5000/api/products'

      const method = editingProduct ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Product operation failed')
        return
      }

      alert(
        editingProduct
          ? 'Product updated successfully ✅'
          : 'Product added successfully ✅'
      )

      resetForm()
      fetchProducts()
    } catch (error) {
      console.error('Product save error:', error)
      alert('Failed to save product')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)

    setFormData({
      name: product.name || '',
      price: product.price || '',
      category: product.category || '',
      stock: product.stock || '',
      rating: product.rating || '',
      description: product.description || '',
      image: product.image || '',
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Delete failed')
        return
      }

      alert('Product deleted successfully ✅')

      fetchProducts()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete product')
    }
  }

  if (loading) {
    return (
      <main className="admin-products-page">
        <h2>Loading products...</h2>
      </main>
    )
  }

  return (
    <main className="admin-products-page">

      <div className="admin-products-header">
        <span>ADMIN PANEL</span>
        <h1>Product Management</h1>
        <p>Add, edit and manage your store products.</p>
      </div>

      {/* PRODUCT FORM */}

      <section className="admin-product-form-card">

        <div className="admin-form-title">
          <h2>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>

          {editingProduct && (
            <button
              type="button"
              className="admin-cancel-btn"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>

          <div className="admin-form-grid">

            <div className="admin-form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter stock"
                min="0"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Example: 4.5"
                min="0"
                max="5"
                step="0.1"
              />
            </div>

            <div className="admin-form-group">
              <label>Image Path</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/image/product.png"
              />
            </div>

          </div>

          <div className="admin-form-group admin-description">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="admin-save-product-btn"
          >
            {editingProduct
              ? '💾 Update Product'
              : '➕ Add Product'}
          </button>

        </form>

      </section>

      {/* PRODUCT LIST */}

      <section className="admin-product-list-section">

        <div className="admin-product-list-header">
          <h2>All Products</h2>
          <span>{products.length} Products</span>
        </div>

        {products.length === 0 ? (

          <div className="admin-no-products">
            <h3>No Products Found</h3>
            <p>Add your first product using the form above.</p>
          </div>

        ) : (

          <div className="admin-products-grid">

            {products.map((product) => (

              <div
                className="admin-product-card"
                key={product._id}
              >

                <div className="admin-product-image">

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <span>🛍️</span>
                  )}

                </div>

                <div className="admin-product-content">

                  <span className="admin-product-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <p className="admin-product-description">
                    {product.description || 'No description'}
                  </p>

                  <div className="admin-product-price">
                    ₹{Number(product.price || 0).toLocaleString('en-IN')}
                  </div>

                  <div className="admin-product-meta">

                    <span>
                      📦 Stock: <strong>{product.stock}</strong>
                    </span>

                    <span>
                      ⭐ {product.rating || 0}
                    </span>

                  </div>

                  <div className="admin-product-actions">

                    <button
                      className="admin-edit-btn"
                      onClick={() => handleEdit(product)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  )
}

export default AdminProducts