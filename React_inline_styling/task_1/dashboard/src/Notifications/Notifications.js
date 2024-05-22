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
  },
  notificationsShow: {
    display: 'block',
  },
  li: {
    listStyleType: 'none',
    position: 'relative',
    paddingLeft: '20px',
  },
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
  },
  span: {
    color: 'inherit',
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
            <ul>
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
                    styles={styles}
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
