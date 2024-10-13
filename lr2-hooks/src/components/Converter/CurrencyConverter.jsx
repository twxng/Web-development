import { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import "./CurrencyConverter.css";

const CurrencyConverter = ({ onClose, exchangeRate }) => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");

  const handleConvert = useCallback(() => {
    if (!amount) return "";
    const numAmount = parseFloat(amount);
    if (fromCurrency === toCurrency) return numAmount.toFixed(2);
    return (fromCurrency === "USD" ? numAmount * exchangeRate : numAmount / exchangeRate).toFixed(2);
  }, [amount, fromCurrency, toCurrency, exchangeRate]);

  const handleCurrencyChange = useCallback((e) => {
    const newCurrency = e.target.value;
    setFromCurrency(newCurrency);
    setToCurrency(newCurrency === "USD" ? "UAH" : "USD");
  }, []);

  const handleReverse = useCallback(() => {
    setFromCurrency((prev) => prev === "USD" ? "UAH" : "USD");
    setToCurrency((prev) => prev === "USD" ? "UAH" : "USD");
  }, []);

  return (
    <div className="currency-converter">
      <h2 style={{ textAlign: 'center' }}>Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <select value={fromCurrency} onChange={handleCurrencyChange}>
        <option value="USD">USD</option>
        <option value="UAH">UAH</option>
      </select>
      <Icon 
        icon="system-uicons:reverse" 
        onClick={handleReverse}
        style={{ cursor: 'pointer' }}
      />
      <select value={toCurrency} onChange={handleCurrencyChange}>
        <option value="UAH">UAH</option>
        <option value="USD">USD</option>
      </select>
      <p>
        Result: {handleConvert()} {toCurrency}
      </p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

CurrencyConverter.propTypes = {
  onClose: PropTypes.func.isRequired,
  exchangeRate: PropTypes.number.isRequired,
};

export default CurrencyConverter;
