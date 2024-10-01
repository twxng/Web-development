import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import Jumbotron from "./components/Jumbotron";
import List from "./components/List/List.jsx";
import Cart from "./components/Cart/Cart.jsx";
import AuthModal from "./components/Authorization/AuthModal.jsx";
import ProductDetail from "./components/Details/ProductDetail.jsx";

const EXCHANGE_RATE = 41.1; //курс на 30.09

const products = [
  {
    name: "Playboi carti bloodsucker tee",
    image: "src/assets/BLOODSUCKER-TEE-247x247.png",
    price: 40.0,
    material: "100% cotton",
    color: "black",
    size: ["L", "M", "XXL"],
  },
  {
    name: "Playboi Carti Burn Tee",
    image: "src/assets/5-247x247.png",
    price: 50.0,
    material: "100% cotton",
    color: "white",
    size: ["S", "M", "L", "XL", "XXL"],
  },

  {
    name: "Playboi Carti wlr sympathy for the vampire tee",
    image: "src/assets/WLR-SYMPATHY-FOR-THE-VAMPIRE-TEE-247x247.png",
    price: 40.0,
    material: "100% cotton",
    color: "black",
    size: ["L", "M", "XXL"],
  },
  {
    name: "Playboi Carti Devils Trill Tee",
    image: "src/assets/7-247x247.png",
    price: 50.0,
    material: "100% cotton",
    color: "black",
    size: ["L", "M", "XXL"],
  },
  {
    name: "Playboi Carti cpfm 4 wlr king vamp hoodie",
    image: "src/assets/CPFM-4-WLR-KING-VAMP-HOODIE-247x247.png",
    price: 150.0,
    material: "100% cotton",
    color: "black",
    size: ["L", "M", "XXL"],
  },
  {
    name: "Playboi Carti Neon Tour T-shirt Black",
    image: "src/assets/36-247x247.png",
    price: 90.0,
    material: "100% cotton",
    color: "neon",
    size: ["L", "M", "XXL"],
  },
  {
    name: "Playboi carti new maps of hell poppy tee",
    image: "src/assets/NEW-MAPS-OF-HELL-POPPY-TEE-247x247.png",
    price: 40.0,
    material: "100% cotton",
    color: "white",
    size: ["L", "M", "XXL"],
  },
  {
    name: "Playboi carti new maps of hell tee",
    image: "src/assets/NEW-MAPS-OF-HELL-TEE-247x247.png",
    price: 40.0,
    material: "100% cotton",
    color: "black",
    size: ["L", "M", "XXL"],
  },
  {
    name: "Playboi Carti Neon Tour Drug Zone Tee Black",
    image: "src/assets/29-247x247.png",
    price: 80.0,
    material: "100% cotton",
    color: "black",
    size: ["L", "M", "XXL"],
  },
  {
    name: "Playboi Carti War Dog Coffee Mug",
    image: "src/assets/WAR-DOG-COFFEE-MUG-247x247.png",
    price: 25.0,
    material: "ceramic",
    color: "black",
    size: ["0.5L"],
  },
];

function App() {
  const [shoppingStarted, setShoppingStarted] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  //last task, but idk
  const [currency, setCurrency] = useState("USD");

  const startShopping = () => {
    console.log("Hello world");
    setShoppingStarted(true);
  };

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const productExists = prevSelectedProducts.find(
        (p) => p.name === product.name
      );
      if (productExists) {
        return prevSelectedProducts.filter((p) => p.name !== product.name);
      } else {
        return [...prevSelectedProducts, { ...product, quantity: 1 }];
      }
    });
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const updateQuantity = (product, amount) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((p) =>
        p.name === product.name
          ? { ...p, quantity: Math.max(p.quantity + amount, 0) }
          : p
      )
    );
  };

  const removeProduct = (product) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((p) => p.name !== product.name)
    );
  };

  const totalPrice = selectedProducts.reduce((sum, product) => {
    const productTotal = product.price * product.quantity;
    return sum + (isNaN(productTotal) ? 0 : productTotal);
  }, 0);

  const handleLogin = (userData) => {
    setCurrentUser({ name: userData.username, email: userData.email });
    setIsAuthModalOpen(false);
  };

  const handleRegister = (userData) => {
    setCurrentUser({ name: userData.username, email: userData.email });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    // localStorage.clear();
  };
  //last task
  const convertCurrency = (priceUSD) => {
    return currency === "USD" ? priceUSD : priceUSD * EXCHANGE_RATE;
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "USD" ? "UAH" : "USD"));
  };

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
      <div className="main-content">
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
      {/* <div className="total-price">
        <h2>Загальна сума: ${totalPrice.toFixed(2)}</h2>
      </div> */}
    </Router>
  );
}

export default App;
