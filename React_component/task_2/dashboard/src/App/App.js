import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      listCourses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ],
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: '<strong>Project deadline</strong> approaching' } }
      ]
    };
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleLoginSuccess() {
    this.setState({ isLoggedIn: true });
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'h') {
      event.preventDefault();
      alert('Logging you out');
      this.props.logOut();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { isLoggedIn, listCourses, listNotifications } = this.state;
    return (
      <div className="App">
        <Notifications listNotifications={listNotifications} />
        <Header />
        {isLoggedIn ? <CourseList listCourses={listCourses} /> : <Login onLoginSuccess={this.handleLoginSuccess} />}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  logOut: PropTypes.func
};

App.defaultProps = {
  logOut: () => {}
};

export default App;