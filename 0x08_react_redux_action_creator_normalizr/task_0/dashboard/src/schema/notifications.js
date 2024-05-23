import * as notificationsData from '../../notifications.json';

export const getAllNotificationsByUser = (userId) => {
  return notificationsData.default.filter(
    (notification) => notification.author.id === userId
  ).map(notification => notification.context);
};
