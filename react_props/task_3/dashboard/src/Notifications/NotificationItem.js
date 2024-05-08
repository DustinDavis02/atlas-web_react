import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ type, html, value }) {
    return (
        <li data-priority={type}>
            {html ? (
                <span dangerouslySetInnerHTML={html} />
            ) : (
                value
            )}
        </li>
    );
}

NotificationItem.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    html: PropTypes.shape({
        __html: PropTypes.string
    })
};

export default NotificationItem;