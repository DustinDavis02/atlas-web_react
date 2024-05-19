import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

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
      <div className="notifications-wrapper">
        <div className="menuItem" onClick={this.toggleDisplayDrawer}>
          Your notifications
        </div>
        {displayDrawer && (
          <div className="Notifications">
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
