import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users');
const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

export const notificationsNormalizer = (data) => normalize(data, [notification]);

const normalizedData = notificationsNormalizer(require('../../notifications.json').default);

export const getAllNotificationsByUser = (userId) => {
  const { notifications, messages } = normalizedData.entities;
  return Object.values(notifications)
    .filter(notification => notification.author === userId)
    .map(notification => messages[notification.context]);
};

export { normalizedData };
