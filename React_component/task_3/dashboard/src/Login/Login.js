import React from 'react';
import './Login.css';

function Login({ onLoginSuccess }) {
  const handleLoginClick = () => {
    onLoginSuccess();
  };

  return (
    <React.Fragment>
      <div className="login-body">
        <p>Login to access the full dashboard</p>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button onClick={handleLoginClick}>OK</button>  {}
      </div>
    </React.Fragment>
  );
}

export default Login;