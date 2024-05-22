import React from 'react';
import logo from '/holberton-logo.png';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    color: 'red',
    padding: '20px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottom: '5px solid red',
  },
  logo: {
    height: '300px',
    marginRight: '20px',
  },
  h1: {
    margin: 0,
    fontSize: '48px',
  },
});

function Header() {
  return (
    <header className={css(styles.header)}>
      <img src={logo} alt="Holberton Logo" className={css(styles.logo)} />
      <h1 className={css(styles.h1)}>School dashboard</h1>
    </header>
  );
}

export default Header;
