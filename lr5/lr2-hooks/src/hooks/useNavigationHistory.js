import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useNavigationHistory = () => {
  const [history, setHistory] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setHistory((prevHistory) => [...prevHistory, location.pathname]);
  }, [location]);

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, clearHistory };
};

export default useNavigationHistory;
