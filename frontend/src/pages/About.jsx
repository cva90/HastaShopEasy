
function About() {
  return (
    <main>
      <section className="about-section">

        <div className="about-heading">
          <span className="about-label">ABOUT US</span>

          <h1>About Hasta ShopEasy</h1>

          <p className="section-text">
            Your simple and trusted online shopping destination.
          </p>
        </div>


        <div className="about-content">

          <div className="about-card">
            <div className="about-icon">🛍️</div>

            <span className="about-number">01</span>

            <h2>Who We Are</h2>

            <p>
              Hasta ShopEasy is a modern e-commerce website
              created to make online shopping simple, convenient
              and enjoyable.
            </p>
          </div>


          <div className="about-card">
            <div className="about-icon">⭐</div>

            <span className="about-number">02</span>

            <h2>Our Mission</h2>

            <p>
              Our mission is to provide quality products at
              affordable prices with a smooth and user-friendly
              shopping experience.
            </p>
          </div>


          <div className="about-card">
            <div className="about-icon">🚚</div>

            <span className="about-number">03</span>

            <h2>Why Choose Us?</h2>

            <p>
              We focus on quality products, simple shopping,
              affordable pricing and a better customer experience.
            </p>
          </div>

        </div>


        <div className="about-highlights">

          <div className="highlight-item">
            <strong>100+</strong>
            <span>Products</span>
          </div>

          <div className="highlight-item">
            <strong>24/7</strong>
            <span>Easy Shopping</span>
          </div>

          <div className="highlight-item">
            <strong>100%</strong>
            <span>Customer Focus</span>
          </div>

        </div>

      </section>
    </main>
  )
}

export default About

