import React from "react";
import Card from "./Card";
import "../assets/list.css"

function List({ products, onCheckboxChange }) {
  return (
    <div className="div">
      <img
        src="src/assets/red.png"
        alt="Red"
        className="mx-auto mb-8"
        style={{ width: "15%", height: "auto", marginTop: "-200px" }}
      />
      <div className="product-list">
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            onCheckboxChange={onCheckboxChange}
          />
        ))}
      </div>
    </div>
  );
}

export default List;
