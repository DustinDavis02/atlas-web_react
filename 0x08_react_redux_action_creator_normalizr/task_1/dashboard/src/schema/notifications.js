import * as notificationsData from '../../notifications.json';

/**
 * Function get notifications for a specific user
 * @param {string} userId - The ID of the user
 * @returns {Array} - List of context objects
 */
export const getAllNotificationsByUser = (userId) => {
  return notificationsData.default.filter(
    (notification) => notification.author.id === userId
  ).map(notification => notification.context);
};
