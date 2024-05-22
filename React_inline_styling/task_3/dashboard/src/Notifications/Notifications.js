import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

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
    background: 'none',
    padding: '10px',
    color: 'black',
    display: 'block',
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

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
    };
  }

  toggleDisplayDrawer = () => {
    this.setState(prevState => ({ displayDrawer: !prevState.displayDrawer }));
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const moreNotifications = nextProps.listNotifications.length > this.props.listNotifications.length;
    const displayDrawerChanged = nextState.displayDrawer !== this.state.displayDrawer;
    return moreNotifications || displayDrawerChanged;
  }

  render() {
    const { listNotifications } = this.props;
    const { displayDrawer } = this.state;
    return (
      <div className={css(styles.wrapper)}>
        <div className={css(styles.menuItem)} onClick={this.toggleDisplayDrawer}>
          Your notifications
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications, styles.notificationsShow)}>
            <button onClick={this.toggleDisplayDrawer} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
              x
            </button>
            <p>Here is the list of notifications</p>
            <ul className={css(styles.ul)}>
              {listNotifications.length === 0 ? (
                <p>No new notification for now</p>
              ) : (
                listNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={this.markAsRead}
                    id={notification.id}
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
  listNotifications: PropTypes.arrayOf(NotificationItemShape)
};

Notifications.defaultProps = {
  listNotifications: []
};

export default Notifications;
