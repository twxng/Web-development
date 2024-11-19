import { createContext, useContext, useState } from 'react';
import { EXCHANGE_RATE } from '../data/constants';

export const CurrencyContext = createContext();
export const CartContext = createContext();
export const UserContext = createContext();

export function AppProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const currencyValue = {
    currency,
    setCurrency,
    toggleCurrency: () => setCurrency(prev => prev === "USD" ? "UAH" : "USD"),
    convertCurrency: (price) => currency === "USD" ? price : price * EXCHANGE_RATE
  };

  const cartValue = {
    selectedProducts,
    setSelectedProducts,
    addToCart: (product) => {
      setSelectedProducts(prev => [...prev, { ...product, quantity: 1 }]);
    },
    removeFromCart: (product) => {
      setSelectedProducts(prev => prev.filter(p => p.name !== product.name));
    },
    updateQuantity: (product, amount) => {
      setSelectedProducts(prev => 
        prev.map(p => p.name === product.name 
          ? { ...p, quantity: Math.max(p.quantity + amount, 0) }
          : p
        )
      );
    }
  };

  const userValue = {
    currentUser,
    setCurrentUser,
    login: (userData) => setCurrentUser({ name: userData.username, email: userData.email }),
    logout: () => setCurrentUser(null)
  };

  return (
    <UserContext.Provider value={userValue}>
      <CurrencyContext.Provider value={currencyValue}>
        <CartContext.Provider value={cartValue}>
          {children}
        </CartContext.Provider>
      </CurrencyContext.Provider>
    </UserContext.Provider>
  );
} 