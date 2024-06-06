import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '/holberton-logo.png';
import { StyleSheet, css } from 'aphrodite';
import { AppContext } from '../App/AppContext';

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
  logoutSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

class Header extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ user, logOut }) => (
          <header className={css(styles.header)}>
            <img src={logo} alt="Holberton Logo" className={css(styles.logo)} />
            <h1 className={css(styles.h1)}>School dashboard</h1>
            {user.isLoggedIn && (
              <div id="logoutSection" className={css(styles.logoutSection)}>
                <span>Welcome {user.email}</span>
                <button onClick={logOut} className={css(styles.logoutButton)}>
                  (logout)
                </button>
              </div>
            )}
          </header>
        )}
      </AppContext.Consumer>
    );
  }
}

Header.contextType = AppContext;

export default Header;
