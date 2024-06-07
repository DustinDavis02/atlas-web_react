import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '/holberton-logo.png';
import { StyleSheet, css } from 'aphrodite';
import { logout } from '../actions/uiActionCreators';

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
  logoutButton: {
    background: 'none',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    fontSize: '16px',
    textDecoration: 'underline',
  },
});

class Header extends Component {
  render() {
    const { user, logout } = this.props;
    return (
      <header className={css(styles.header)}>
        <img src={logo} alt="Holberton Logo" className={css(styles.logo)} />
        <h1 className={css(styles.h1)}>School dashboard</h1>
        {user.isLoggedIn && (
          <div id="logoutSection" className={css(styles.logoutSection)}>
            <span>Welcome {user.email}</span>
            <button onClick={logout} className={css(styles.logoutButton)}>
              (logout)
            </button>
          </div>
        )}
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    email: PropTypes.string,
  }),
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: {
    isLoggedIn: false,
    email: '',
  },
};

const mapStateToProps = (state) => ({
  user: state.get('user'),
});

const mapDispatchToProps = {
  logout,
};

export { Header as HeaderComponent };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
