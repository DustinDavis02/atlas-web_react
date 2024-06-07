import { Map } from 'immutable';
import { 
  FETCH_NOTIFICATIONS_SUCCESS, 
  MARK_AS_READ, 
  SET_TYPE_FILTER, 
  SET_LOADING_STATE, 
  NotificationTypeFilters 
} from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

const initialState = Map({
  notifications: Map(),
  filter: NotificationTypeFilters.DEFAULT,
  loading: false,
});

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_STATE:
      return state.set('loading', action.isLoading);

    case FETCH_NOTIFICATIONS_SUCCESS:
      const normalizedData = notificationsNormalizer(action.data);
      let newNotifications = state.get('notifications').mergeDeep(normalizedData.entities.notifications);
      return state.set('notifications', newNotifications);

    case MARK_AS_READ:
      return state.setIn(['notifications', action.index.toString(), 'isRead'], true);

    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);

    default:
      return state;
  }
};

export default notificationReducer;
