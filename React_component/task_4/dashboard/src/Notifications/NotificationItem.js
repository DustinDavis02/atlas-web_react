import React from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends React.Component {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    return (
      <li data-priority={type} onClick={() => markAsRead(id)}>
        {html ? (
          <span dangerouslySetInnerHTML={html} />
        ) : (
          value
        )}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string
  }),
  markAsRead: PropTypes.func,
  id: PropTypes.number.isRequired,
};

export default NotificationItem;
