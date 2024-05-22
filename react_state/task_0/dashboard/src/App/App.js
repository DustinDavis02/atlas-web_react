import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  app: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    overflowX: 'hidden',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      displayDrawer: false,
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
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
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

  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { isLoggedIn, listCourses, listNotifications, displayDrawer } = this.state;
    return (
      <div className={css(styles.app)}>
        <Notifications 
          listNotifications={listNotifications} 
          displayDrawer={displayDrawer}
          handleDisplayDrawer={this.handleDisplayDrawer}
          handleHideDrawer={this.handleHideDrawer}
        />
        <Header />
        {isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList listCourses={listCourses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login onLoginSuccess={this.handleLoginSuccess} />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>(This is real text Generaded with the Lorem Ipsum Generator.)Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim ut sem. Sed vulputate odio ut enim blandit volutpat maecenas. Quisque id diam vel quam elementum pulvinar etiam non quam. Habitant morbi tristique senectus et netus et malesuada. Condimentum mattis pellentesque id nibh. Ultrices neque ornare aenean euismod elementum nisi. Magna fringilla urna porttitor rhoncus dolor purus. Nibh venenatis cras sed felis eget velit aliquet. Est ultricies integer quis auctor. Sit amet risus nullam eget felis eget nunc. Diam vulputate ut pharetra sit amet aliquam id diam maecenas. Ac turpis egestas sed tempus. Ornare suspendisse sed nisi lacus sed viverra tellus in. Mus mauris vitae ultricies leo integer malesuada nunc.</p>
        </BodySection>
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
