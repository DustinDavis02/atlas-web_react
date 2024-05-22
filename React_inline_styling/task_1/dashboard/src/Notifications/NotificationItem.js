import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

class NotificationItem extends React.PureComponent {
  render() {
    const { type, html, value, markAsRead, id, styles } = this.props;
    return (
      <li
        data-priority={type}
        className={css(styles.li, type === 'urgent' ? styles.urgent : styles.default)}
        onClick={() => markAsRead(id)}
      >
        {html ? (
          <span dangerouslySetInnerHTML={html} className={css(styles.span)} />
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
  styles: PropTypes.object.isRequired,
};

export default NotificationItem;
