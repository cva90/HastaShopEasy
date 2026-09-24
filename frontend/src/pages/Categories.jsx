import { Link } from 'react-router-dom'
const categories = [
  {
    name: 'Electronics',
    icon: '🎧',
    description:
      'Discover modern electronics including headphones, smart watches and other useful gadgets.',
  },
  {
    name: 'Fashion',
    icon: '👟',
    description:
      'Find comfortable and stylish fashion products for your everyday lifestyle.',
  },
  {
    name: 'Travel',
    icon: '🧳',
    description:
      'Explore useful travel products designed to make your journeys easier and more comfortable.',
  },
  {
    name: 'All Products',
    icon: '🛍️',
    description:
      'Browse our complete collection of products across all categories.',
  },
]

function Categories() {
  return (
    <main>
      <section className="categories-section">

        <div className="categories-heading">
          <span className="categories-label">EXPLORE COLLECTION</span>

          <h1>Shop By Category</h1>

          <p className="section-text">
            Choose a category and explore our products.
          </p>
        </div>

        <div className="category-grid">

          {categories.map((category) => (
            <div className="category-item" key={category.name}>

              <div className="category-icon">
                {category.icon}
              </div>

              <span className="category-name">
                {category.name}
              </span>

              <p className="category-description">
                {category.description}
              </p>

              <Link
  to={`/products?category=${encodeURIComponent(category.name)}`}
  className="view-btn"
>
  Explore →
</Link>

            </div>
          ))}

        </div>

      </section>
    </main>
  )
}

export default Categories

