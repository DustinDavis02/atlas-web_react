import { createSelector } from 'reselect';

const notificationsState = (state) => state.get('notifications');

export const filterTypeSelected = createSelector(
  notificationsState,
  (notifications) => notifications.get('filter')
);

export const getNotifications = createSelector(
  notificationsState,
  (notifications) => notifications.get('notifications')
);

export const getUnreadNotifications = createSelector(
  getNotifications,
  (notifications) => notifications.filter(notification => !notification.get('isRead'))
);
