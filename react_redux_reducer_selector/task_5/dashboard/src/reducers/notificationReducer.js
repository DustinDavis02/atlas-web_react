import { Map } from 'immutable';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER, NotificationTypeFilters } from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

const initialState = Map({
  notifications: Map(),
  filter: NotificationTypeFilters.DEFAULT,
});

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      const normalizedData = notificationsNormalizer(action.data);
      let newNotifications = state.get('notifications');
      Object.values(normalizedData.entities.notifications).forEach(notification => {
        newNotifications = newNotifications.set(notification.id, Map({ ...notification, isRead: false }));
      });
      return state.set('notifications', newNotifications);
    case MARK_AS_READ:
      return state.setIn(['notifications', action.index, 'isRead'], true);
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    default:
      return state;
  }
};

export default notificationReducer;
