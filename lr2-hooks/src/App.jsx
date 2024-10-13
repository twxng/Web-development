import { useState, useCallback, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import Jumbotron from "./components/Jumbotron";
import List from "./components/List/List.jsx";
import Cart from "./components/Cart/Cart.jsx";
import AuthModal from "./components/Authorization/AuthModal.jsx";
import ProductDetail from "./components/Details/ProductDetail.jsx";
import CurrencyConverter from "./components/Converter/CurrencyConverter";
import { products, EXCHANGE_RATE } from "./data/constants";

function App() {
  const [shoppingStarted, setShoppingStarted] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isCurrencyConverterOpen, setIsCurrencyConverterOpen] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const startShopping = useCallback(() => {
    setShoppingStarted(true);
  }, []);

  const handleCheckboxChange = useCallback((product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const productExists = prevSelectedProducts.find(
        (p) => p.name === product.name
      );
      if (productExists) {
        setSelectedProductIds(prev => prev.filter(id => id !== product.name));
        return prevSelectedProducts.filter((p) => p.name !== product.name);
      } else {
        setSelectedProductIds(prev => [...prev, product.name]);
        return [...prevSelectedProducts, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prevIsCartOpen => !prevIsCartOpen);
  }, []);

  const updateQuantity = useCallback((product, amount) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((p) =>
        p.name === product.name
          ? { ...p, quantity: Math.max(p.quantity + amount, 0) }
          : p
      )
    );
  }, []);

  const removeProduct = useCallback((product) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((p) => p.name !== product.name)
    );
    setSelectedProductIds(prev => prev.filter(id => id !== product.name));
  }, []);

  const totalPrice = useMemo(() => selectedProducts.reduce((sum, product) => {
    const productTotal = product.price * product.quantity;
    return sum + (isNaN(productTotal) ? 0 : productTotal);
  }, 0), [selectedProducts]);

  const handleLogin = useCallback((userData) => {
    setCurrentUser({ name: userData.username, email: userData.email });
    setIsAuthModalOpen(false);
  }, []);

  const handleRegister = useCallback((userData) => {
    setCurrentUser({ name: userData.username, email: userData.email });
    setIsAuthModalOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const convertCurrency = useCallback((priceUSD) => {
    return currency === "USD" ? priceUSD : priceUSD * EXCHANGE_RATE;
  }, [currency]);

  const toggleCurrency = useCallback(() => {
    setCurrency((prev) => (prev === "USD" ? "UAH" : "USD"));
  }, []);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setIsContextMenuOpen(true);
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setIsContextMenuOpen(false);
  }, []);

  const handleOpenCurrencyConverter = useCallback(() => {
    setIsCurrencyConverterOpen(true);
    setIsContextMenuOpen(false);
  }, []);

  return (
    <Router>
      <Navbar
        selectedCount={selectedProducts.length}
        toggleCart={toggleCart}
        currentUser={currentUser}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        currency={currency}
        toggleCurrency={toggleCurrency}
      />
      <div className="main-content" onContextMenu={handleContextMenu} onClick={handleCloseContextMenu}>
        <Routes>
          <Route
            path="/product/:name"
            element={
              <ProductDetail
                products={products}
                convertCurrency={convertCurrency}
                currency={currency}
              />
            }
          />
          <Route
            path="/"
            element={
              !shoppingStarted ? (
                <Jumbotron startShopping={startShopping} />
              ) : (
                <List
                  products={products}
                  onCheckboxChange={handleCheckboxChange}
                  updateQuantity={updateQuantity}
                  currentUser={currentUser}
                  convertCurrency={convertCurrency}
                  currency={currency}
                  selectedProductIds={selectedProductIds}
                />
              )
            }
          />
        </Routes>
      </div>

      {isCartOpen && (
        <Cart
          products={selectedProducts}
          updateQuantity={updateQuantity}
          removeProduct={removeProduct}
          totalPrice={totalPrice}
          convertCurrency={convertCurrency}
          currency={currency}
        />
      )}

      <Footer />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      {isContextMenuOpen && (
        <div
          className="context-menu"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          <button onClick={handleOpenCurrencyConverter}>Конвертер валют</button>
        </div>
      )}
      {isCurrencyConverterOpen && (
        <div className="modal-overlay">
          <CurrencyConverter
            onClose={() => setIsCurrencyConverterOpen(false)}
            exchangeRate={EXCHANGE_RATE}
          />
        </div>
      )}
      {/* <div className="total-price">
        <h2>Загальна сума: ${totalPrice.toFixed(2)}</h2>
      </div> */}
    </Router>
  );
}

export default App;
