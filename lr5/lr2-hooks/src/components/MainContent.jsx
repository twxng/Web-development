import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Jumbotron from "./Jumbotron";
import List from "./List/List";
import Cart from "./Cart/Cart";
import AuthModal from "./Authorization/AuthModal";
import CurrencyConverter from "./Converter/CurrencyConverter";
import { products, EXCHANGE_RATE } from "../data/constants";
import DebugWindow from "./DebugWindow/DebugWindow";

function MainContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCurrencyConverterOpen, setIsCurrencyConverterOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setIsCurrencyConverterOpen(true);
  };

  const filteredProducts = (category) => {
    if (category === "all") return products;
    return products.filter(product => {
      if (category === "tshirts") return product.name.toLowerCase().includes("tee");
      if (category === "hoodies") return product.name.toLowerCase().includes("hoodie");
      if (category === "accessories") return !product.name.toLowerCase().includes("tee") && !product.name.toLowerCase().includes("hoodie");
      return true;
    });
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <Navbar
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        onLoginClick={() => setIsAuthModalOpen(true)}
        toggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
        isHistoryOpen={isHistoryOpen}
      />
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Jumbotron startShopping={() => <Navigate to="/all" />} />} />
          <Route path="/all" element={<List products={filteredProducts("all")} />} />
          <Route path="/tshirts" element={<List products={filteredProducts("tshirts")} />} />
          <Route path="/hoodies" element={<List products={filteredProducts("hoodies")} />} />
          <Route path="/accessories" element={<List products={filteredProducts("accessories")} />} />
        </Routes>
      </div>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {isCurrencyConverterOpen && (
        <CurrencyConverter
          onClose={() => setIsCurrencyConverterOpen(false)}
          exchangeRate={EXCHANGE_RATE}
        />
      )}
      
      <Footer />

      {isHistoryOpen && <DebugWindow isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />}
    </div>
  );
}

export default MainContent; 