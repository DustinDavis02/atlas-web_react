import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import { connect } from 'react-redux';
import { fetchNotifications } from '../actions/notificationActionCreators';

const opacityChange = {
  'from': { opacity: 0.5 },
  'to': { opacity: 1 },
};

const bounce = {
  '0%': { transform: 'translateY(0px)' },
  '50%': { transform: 'translateY(-5px)' },
  '100%': { transform: 'translateY(5px)' },
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    '@media (max-width: 900px)': {
      width: '100%',
      top: 0,
      right: 0,
      alignItems: 'center',
    },
  },
  menuItem: {
    textAlign: 'right',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    background: '#fff8f8',
    padding: '10px',
    color: 'black',
    display: 'block',
    ':hover': {
      animationName: [opacityChange, bounce],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3, 3',
      animationTimingFunction: 'ease-in-out',
    },
  },
  notifications: {
    border: '2px solid black',
    padding: '10px',
    backgroundColor: '#fff',
    width: '350px',
    textAlign: 'left',
    '@media (max-width: 900px)': {
      width: '100%',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      margin: 0,
      padding: 0,
      fontSize: '20px',
    },
  },
  notificationsShow: {
    display: 'block',
  },
  ul: {
    padding: 0,
    '@media (max-width: 900px)': {
      padding: 0,
    },
  },
});

class Notifications extends PureComponent {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const { listNotifications, displayDrawer, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead } = this.props;
    return (
      <div className={css(styles.wrapper)}>
        {!displayDrawer && (
          <div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
            Your notifications
          </div>
        )}
        {displayDrawer && (
          <div className={css(styles.notifications, styles.notificationsShow)}>
            <button onClick={handleHideDrawer} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
              x
            </button>
            <p>Here is the list of notifications</p>
            <ul className={css(styles.ul)}>
              {listNotifications.size === 0 ? (
                <p>No new notification for now</p>
              ) : (
                listNotifications.valueSeq().map(notification => (
                  <NotificationItem
                    key={notification.get('id')}
                    type={notification.get('type')}
                    value={notification.get('value')}
                    html={notification.get('html')}
                    markAsRead={() => markNotificationAsRead(notification.get('id'))}
                    id={notification.get('id')}
                  />
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

Notifications.propTypes = {
  listNotifications: PropTypes.object.isRequired,
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
  fetchNotifications: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  listNotifications: Map(),
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

const mapStateToProps = (state) => ({
  listNotifications: state.notifications.get('notifications'),
});

const mapDispatchToProps = {
  fetchNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
