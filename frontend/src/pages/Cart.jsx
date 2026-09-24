
import { Link } from 'react-router-dom'

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  totalPrice,
}) {
  const calculatedTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <main>
        <section className="cart-page empty-cart-page">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h1>Your Cart is Empty</h1>

          <p className="section-text">
            You haven't added any products to your cart yet.
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

  return (
    <main>
      <section className="cart-page">

        <div className="cart-header">
          <div>
            <h1>Your Shopping Cart</h1>

            <p className="section-text">
              Review your items before checkout.
            </p>
          </div>

          <Link
            to="/products"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="cart-container">

          {/* CART ITEMS */}

          <div className="cart-items">

            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-info">

                  <span className="category">
                    {item.category}
                  </span>

                  <h2>{item.name}</h2>

                  <p>
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>

                  <div className="quantity-control">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    🗑 Remove
                  </button>

                </div>

                <strong className="cart-item-total">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </strong>

              </div>
            ))}

          </div>

          {/* CART SUMMARY */}

          <aside className="cart-summary-card">

            <h2>Order Summary</h2>

            <div className="summary-line">
              <span>Items</span>
              <span>
                {cart.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="summary-line">
              <span>Subtotal</span>
              <span>
                ₹{calculatedTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="summary-line">
              <span>Delivery</span>
              <span>Free</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>

              <strong>
                ₹{calculatedTotal.toLocaleString('en-IN')}
              </strong>
            </div>

            <Link
              to="/checkout"
              className="checkout-btn full-width"
            >
              Proceed to Checkout →
            </Link>

            <Link
              to="/products"
              className="view-cart-btn"
            >
              + Add More Products
            </Link>

          </aside>

        </div>

      </section>
    </main>
  )
}

export default Cart

