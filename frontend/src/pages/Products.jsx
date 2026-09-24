import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function Products({ addToCart }) {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchParams] = useSearchParams()

  const categoryFilter = searchParams.get('category')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/products'
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to fetch products'
          )
        }

        setProducts(data)
      } catch (error) {
        console.error('Product fetch error:', error)
        setError('Unable to load products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesCategory =
      !categoryFilter ||
      categoryFilter === 'All Products' ||
      product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <main>
        <section className="products-section">
          <div className="products-heading">
            <span className="products-label">
              SHOP COLLECTION
            </span>

            <h1>Our Products</h1>

            <p className="section-text">
              Loading products...
            </p>
          </div>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <section className="products-section">
          <div className="no-products">
            <div>⚠️</div>
            <h3>{error}</h3>
            <p>
              Please make sure the backend server is running.
            </p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>

      <section className="products-section">

        <div className="products-heading">

          <span className="products-label">
            SHOP COLLECTION
          </span>

          <h1>
            {categoryFilter &&
            categoryFilter !== 'All Products'
              ? categoryFilter
              : 'Our Products'}
          </h1>

          <p className="section-text">
            Explore our quality products at affordable prices.
          </p>

        </div>

        <div className="search-box">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}

        </div>

        <div className="product-grid">

          {filteredProducts.map((product) => (

            <div
              className="product-card"
              key={product._id}
            >

              <div className="product-image">

                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />

              </div>

              <div className="product-info">

                <span className="category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <p className="price">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </p>

                <p className="product-description">
                  {product.description}
                </p>

                <p className="product-stock">
                  {product.stock > 0
                    ? `📦 ${product.stock} in stock`
                    : '❌ Out of stock'}
                </p>

                <div className="product-buttons">

                  <button
                    className="add-cart"
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0
                      ? '🛒 Add to Cart'
                      : 'Out of Stock'}
                  </button>

                  <Link
                    to="/cart"
                    className="view-cart-btn"
                  >
                    View Cart →
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

        {filteredProducts.length === 0 && (

          <div className="no-products">

            <div>🔎</div>

            <h3>
              No products found
            </h3>

            <p>
              Try searching with another product name.
            </p>

          </div>

        )}

      </section>

    </main>
  )
}

export default Products