import "../Cart/cart.css";
import "../Cart/cart.css";
import PropTypes from 'prop-types';

function Cart({
  products,
  updateQuantity,
  removeProduct,
  currency,
  convertCurrency,
}) {
  Cart.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })).isRequired,
    updateQuantity: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
    totalPrice: PropTypes.number,
    currency: PropTypes.string.isRequired,
    convertCurrency: PropTypes.func.isRequired,
  };

  const handleQuantityChange = (product, change) => {
    if (typeof updateQuantity === "function") {
      updateQuantity(product, change);
    } else {
      console.error("updateQuantity is not a function");
    }
  };

  return (
    <div className="cart">
      <h2
        style={{
          color: "rgb(255, 26, 26)",
          fontWeight: "bold",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        Your shopping cart
      </h2>
      <div className="cart-items">
        {products.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your shopping cart is empty</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="cart-item">
              <img
                src={product.image}
                alt={product.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <span className="cart-item-name">{product.name}</span>
                <span className="cart-item-price">
                  {currency === "USD" ? "$" : "₴"}
                  {convertCurrency(product.price).toFixed(2)}
                </span>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(product, -1)}>
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product, 1)}>
                    +
                  </button>
                </div>
                <button onClick={() => removeProduct(product)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-total">
        <h3>
          Total amount: {currency === "USD" ? "$" : "₴"}
          {convertCurrency(
            products.reduce((acc, product) => acc + product.price * product.quantity, 0)
          ).toFixed(2)}
        </h3>
      </div>
      <div className="checkout-button" style={{textAlign: "center"}}>
        <button>Make an order</button>
      </div>
    </div>
  );
}

export default Cart;
