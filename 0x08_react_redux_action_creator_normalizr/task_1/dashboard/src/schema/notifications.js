import { normalize, schema } from 'normalizr';
import * as notificationsData from '../../notifications.json';

export const getAllNotificationsByUser = (userId) => {
  return notificationsData.default.filter(
    (notification) => notification.author.id === userId
  ).map(notification => notification.context);
};

const user = new schema.Entity('users');

const message = new schema.Entity('messages', {}, {
  idAttribute: 'guid',
});

const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

const normalizedData = normalize(notificationsData.default, [notification]);

export { normalizedData };
