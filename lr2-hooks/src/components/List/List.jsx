import React, { useState } from "react";
import Card from "../Card/Card.jsx";
import ProductDetail from "../Details/ProductDetail.jsx";

function List({
  products,
  onCheckboxChange,
  currentUser,
  convertCurrency,
  currency,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setHistory((prevHistory) => [
      ...prevHistory.slice(0, historyIndex + 1),
      product,
    ]);
    setHistoryIndex((prevIndex) => prevIndex + 1);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      setSelectedProduct(history[historyIndex - 1]);
    } else {
      setSelectedProduct(null);
      setHistoryIndex(-1);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      setSelectedProduct(history[historyIndex + 1]);
    }
  };

  return (
    <div className="product-container">
      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={handleBack}
          onForward={historyIndex < history.length - 1 ? handleForward : null}
          currentUser={currentUser}
          convertCurrency={convertCurrency}
          currency={currency}
        />
      ) : (
        <>
          <img
            src="/src/assets/red.png"
            alt="Red"
            className="mx-auto mb-8"
            style={{ width: "15%", height: "auto", marginTop: "-220px" }}
          />
          <div className="product-list">
            {products.map((product, index) => {
              if (
                !product ||
                !onCheckboxChange ||
                !convertCurrency ||
                !currency
              ) {
                console.error("Missing required props for Card", {
                  product,
                  onCheckboxChange,
                  convertCurrency,
                  currency,
                });
                return null;
              }
              return (
                <Card
                  key={index}
                  product={product}
                  onCheckboxChange={onCheckboxChange}
                  onCardClick={handleCardClick}
                  convertCurrency={convertCurrency}
                  currency={currency}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default List;
