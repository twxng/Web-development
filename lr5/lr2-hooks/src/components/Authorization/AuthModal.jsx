import React, { useState } from 'react';
import '../Authorization/authModal.css';
import loginImage from '../../assets/image1.jpg';

function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      onLogin({ email, password });
    } else {
      onRegister({ username, email, password });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className={`auth-modal-layout ${isLoginMode ? 'login-mode' : 'register-mode'}`}>
          <div className="auth-image-container" style={{backgroundImage: `url(${loginImage})`}}></div>
          <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
              <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
              {!isLoginMode && (
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">{isLoginMode ? 'Sign In' : 'Register'}</button>
              <p>
                {isLoginMode ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
                <span onClick={() => setIsLoginMode(!isLoginMode)}>
                  {isLoginMode ? 'Register' : 'Login'}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
