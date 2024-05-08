import React, { useState } from 'react';
import './Notifications.css';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';

function Notifications() {
  const [displayDrawer, setDisplayDrawer] = useState(false);

  const toggleDisplayDrawer = () => {
    setDisplayDrawer(!displayDrawer);
  };

  const handleClick = () => {
    console.log('Close button has been clicked');
  };

  return (
    <div className="notifications-wrapper">
      <div className="menuItem" onClick={toggleDisplayDrawer}>
        Your notifications
      </div>
      <div className={`Notifications ${displayDrawer ? 'show' : ''}`}>
        <button style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', cursor: 'pointer' }} aria-label="Close" onClick={handleClick}>
          x
        </button>
        <p>Here is the list of notifications</p>
        <ul>
          <NotificationItem type="default" value="New course available" />
          <NotificationItem type="urgent" value="New resume available" />
          <NotificationItem type="urgent" html={{ __html: getLatestNotification() }} />
        </ul>
      </div>
    </div>
  );
}

export default Notifications;