import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "../Details/detail.css";

function ProductDetail({
  product,
  onBack,
  onForward,
  currentUser,
  convertCurrency,
  currency,
}) {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState([]);
  const displayPrice = convertCurrency(product.price).toFixed(2);

  useEffect(() => {
    const savedComments =
      JSON.parse(localStorage.getItem(`comments-${product.name}`)) || [];
    setComments(savedComments);
  }, [product.name]);

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
          alert("Sup, bro, input yr name, pls");
          return;
        }
        newComment = `${username}: ${comment} (${timestamp})`;
      }

      const newComments = [...comments, newComment];
      setComments(newComments);
      setComment("");
      if (!currentUser) setUsername("");
      localStorage.setItem(
        `comments-${product.name}`,
        JSON.stringify(newComments)
      );
    }
  };

  return (
    <div className="detcenter">
      <div className="navigation-buttons">
        <button onClick={onBack} className="nav-button">
          <Icon icon="ic:baseline-arrow-back" width="24" height="24" /> Назад
        </button>
        {onForward && (
          <button onClick={onForward} className="nav-button">
            Вперед{" "}
            <Icon icon="ic:baseline-arrow-forward" width="24" height="24" />
          </button>
        )}
      </div>

      <div className="product-detail">
        <div className="base-product-haracteristics">
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {product.name}
          </h2>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <p className="product-price">
            {currency === "USD" ? "$" : "₴"}
            {displayPrice}
          </p>
        </div>

        <div className="description">
          <h3>Description:</h3>
          <ul className="product-features">
            <li>
              {" "}
              Material: <span>{product.material}</span>
            </li>
            <li>
              {" "}
              Size: <span>{product.size.join(", ")}</span>
            </li>
            <li> Color: {product.color} </li>
          </ul>
        </div>

        <div className="delivery">
          <h3>Delivery information:</h3>
          <p>
            Delivery is carried out within 3-5 business days throughout Ukraine.
          </p>
        </div>
        <div className="comments">
          <h3 style={{ fontWeight: "bold" }}>Comments:</h3>
          <ul className="comments-list">
            {comments.map((c, index) => (
              <li key={index}>
                <span style={{ color: "red" }}>{c.split(": ")[0]}:</span>{" "}
                <span style={{ color: "white" }}>
                  {c.split(": ")[1].split(" (")[0]}
                </span>
                <span style={{ color: "red" }}> ({c.split(" (")[1]}</span>{" "}
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
            <input
              type="text"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Your comment"
              className="comment-input"
            />
            <button type="submit" className="comment-submit">
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
