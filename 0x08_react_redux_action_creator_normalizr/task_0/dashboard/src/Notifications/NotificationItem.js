import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
  },
  li: {
    listStyleType: 'none',
    position: 'relative',
    paddingLeft: '20px',
    width: '100%',
    borderBottom: '1px solid black',
    fontSize: '20px',
    padding: '10px 8px',
  },
  span: {
    color: 'inherit',
  },
});

class NotificationItem extends React.PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
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
};

export default NotificationItem;
