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
    '@media (max-width: 900px)': {
      alignItems: 'center',
    },
  },
  input: {
    width: '30%',
    margin: '8px 0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    '@media (max-width: 900px)': {
      width: '100%',
    },
  },
  label: {
    width: '30%',
    textAlign: 'left',
    marginTop: '10px',
    '@media (max-width: 900px)': {
      width: '100%',
      textAlign: 'center',
    },
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
    '@media (max-width: 900px)': {
      width: '100%',
    },
  },
  buttonHover: {
    backgroundColor: '#45a050',
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.logIn(email, password);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value }, this.toggleSubmitButton);
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value }, this.toggleSubmitButton);
  }

  toggleSubmitButton() {
    const { email, password } = this.state;
    this.setState({ enableSubmit: email !== '' && password !== '' });
  }

  render() {
    const { email, password, enableSubmit } = this.state;
    return (
      <div className={css(styles.loginBody)}>
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email" className={css(styles.label)}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className={css(styles.input)}
            value={email}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="password" className={css(styles.label)}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className={css(styles.input)}
            value={password}
            onChange={this.handleChangePassword}
          />
          <input
            type="submit"
            value="OK"
            className={css(styles.button, styles.buttonHover)}
            disabled={!enableSubmit}
          />
        </form>
      </div>
    );
  }
}

export default Login;
