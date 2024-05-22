import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  loginBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    padding: '34px',
    width: '100%',
  },
  input: {
    width: '30%',
    margin: '8px 0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  label: {
    width: '30%',
    textAlign: 'left',
    marginTop: '10px',
  },
  button: {
    width: '30%',
    margin: '8px 0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#999797',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  buttonHover: {
    backgroundColor: '#45a050',
  },
});

function Login({ onLoginSuccess }) {
  const handleLoginClick = () => {
    onLoginSuccess();
  };

  return (
    <React.Fragment>
      <div className={css(styles.loginBody)}>
        <p>Login to access the full dashboard</p>
        <label htmlFor="email" className={css(styles.label)}>Email:</label>
        <input type="email" id="email" name="email" className={css(styles.input)} />
        <label htmlFor="password" className={css(styles.label)}>Password:</label>
        <input type="password" id="password" name="password" className={css(styles.input)} />
        <button onClick={handleLoginClick} className={css(styles.button, styles.buttonHover)}>OK</button>
      </div>
    </React.Fragment>
  );
}

export default Login;
