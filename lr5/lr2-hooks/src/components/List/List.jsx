import { useState } from "react";
import Card from "../Card/Card";
import ProductDetail from "../Details/ProductDetail";
import PropTypes from "prop-types";
import { useCurrency, useUser } from '../../hooks/useAppContext';
import './list.css';
import '../Card/card.css';


function List({ products }) {
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
        />
      ) : (
        <>
          <img
            src="/assets/red.png"
            alt="Red"
            className="mx-auto mb-8"
            style={{ width: "15%", height: "auto", marginTop: "-220px" }}
          />
          <div className="product-list">
            {products.map((product, index) => (
              <Card
                key={index}
                product={product}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

List.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default List;
