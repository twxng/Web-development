import React from 'react';
import { Icon } from "@iconify/react";
import useNavigationHistory from '../../hooks/useNavigationHistory';
import './debugWindow.css';

const DebugWindow = ({ isOpen, onClose }) => {
  const { history, clearHistory } = useNavigationHistory();

  if (!isOpen) return null;

  return (
    <>
      <div className="debug-window">
        <div className="debug-header">
          <Icon icon="mdi:history" width="24" height="24" />
          <h2>Navigation History</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <button onClick={clearHistory} className="clear-button">
          Clear History
        </button>
        <ul className="history-list">
          {history.map((path, index) => (
            <li key={index}>
              <Icon icon="mdi:clock-outline" width="16" height="16" />
              {path}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DebugWindow;