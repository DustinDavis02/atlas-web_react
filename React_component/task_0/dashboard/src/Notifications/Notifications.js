import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

function Notifications({ listNotifications = [] }) {
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const toggleDisplayDrawer = () => setDisplayDrawer(!displayDrawer);

  return (
    <div className="notifications-wrapper">
      <div className="menuItem" onClick={toggleDisplayDrawer}>
        Your notifications
      </div>
      {displayDrawer && (
        <div className="Notifications">
          <button onClick={() => setDisplayDrawer(false)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
            x
          </button>
          <p>Here is the list of notifications</p>
          <ul>
            {listNotifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              listNotifications.map(notification => (
                <NotificationItem key={notification.id} type={notification.type} value={notification.value} html={notification.html} />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

Notifications.propTypes = {
  listNotifications: PropTypes.arrayOf(NotificationItemShape)
};

export default Notifications;