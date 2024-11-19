import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useCurrency, useUser, useCart } from '../../hooks/useAppContext';
import "./detail.css"

function ProductDetail({ product, onBack }) {
  const { currency, convertCurrency } = useCurrency();
  const { selectedProducts, addToCart, removeFromCart } = useCart();
  const { currentUser } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const isSelected = selectedProducts.some(p => p.name === product.name);
  
  const handleCartClick = (e) => {
    e.stopPropagation();
    if (isSelected) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const displayPrice = convertCurrency(product.price).toFixed(2);

  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [comments, setComments] = useLocalStorage(`comments-${product.name}`, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      console.log(comment);
      alert(`Your feedback: "${comment}" has been added successfully!`);

      let newComment;
      const timestamp = new Date().toLocaleString();
      if (currentUser) {
        newComment = `${currentUser.name}: ${comment} (${timestamp})`;
      } else {
        if (!username.trim()) {
          alert("Please enter your name");
          return;
        }
        newComment = `${username}: ${comment} (${timestamp})`;
      }

      const newComments = [...comments, newComment];
      setComments(newComments);
      setComment("");
      if (!currentUser) setUsername("");
    }
  };

  useEffect(() => {
    document.title = `${product.name}`;
    return () => {
      document.title = "Playboi Carti Merch Store";
    };
  }, [product.name]);

  return (
    <div className="detcenter">
      <div className="navigation-buttons">
        <button onClick={onBack} className="nav-button">
          <Icon icon="ic:baseline-arrow-back" width="24" height="24" /> Back
        </button>
      </div>

      <div className="product-detail">
        <div className="base-product-haracteristics">
          <div className="product-actions">
            <button 
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
            >
              <Icon 
                icon={isFavorite ? "bi:heart-fill" : "bi:heart"} 
                color={isFavorite ? "#ff4040" : "#fff"} 
                width="24" 
              />
            </button>
            <button 
              className={`cart-button ${isSelected ? 'active' : ''}`}
              onClick={handleCartClick}
            >
              <Icon 
                icon={isSelected ? "mdi:cart-check" : "ic:twotone-add-shopping-cart"} 
                color={isSelected ? "#ff4040" : "#fff"} 
                width="24" 
              />
            </button>
          </div>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} className="product-image" />
          <p className="product-price">
            {currency === "USD" ? "$" : "₴"}
            {displayPrice}
          </p>
        </div>

        <div className="product-info">
          <div className="description">
            <h3>Description:</h3>
            <ul className="product-features">
              <li>
                Material: <span>{product.material}</span>
              </li>
              <li>
                Size: <span>{product.size.join(", ")}</span>
              </li>
              <li>Color: {product.color}</li>
            </ul>
          </div>

          <div className="delivery">
            <h3>Delivery Information:</h3>
            <p>Delivery is made within 3-5 business days throughout Ukraine.</p>
          </div>

          <div className="comments">
            <h3>Comments:</h3>
            <ul className="comments-list">
              {comments.map((c, index) => (
                <li key={index}>
                  <span style={{ color: "#c70000" }}>{c.split(": ")[0]}:</span>{" "}
                  <span>{c.split(": ")[1].split(" (")[0]}</span>
                  <span style={{ color: "#888" }}> ({c.split(" (")[1]}</span>
                </li>
              ))}
            </ul>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              {!currentUser && (
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Your name"
                  className="username-input"
                />
              )}
              {/* <textarea */}
              <input
                type="text"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Your comment"
                className="comment-input"
              />
              <button type="submit" className="comment-submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
    size: PropTypes.arrayOf(PropTypes.string).isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func,
};

export default ProductDetail;
