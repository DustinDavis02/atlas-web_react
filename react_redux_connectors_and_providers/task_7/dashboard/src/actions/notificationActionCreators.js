import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_LOADING_STATE,
} from './notificationActionTypes';

export const markAsRead = (index) => ({
  type: MARK_AS_READ,
  index,
});

export const setNotificationFilter = (filter) => ({
  type: SET_TYPE_FILTER,
  filter,
});

export const setLoadingState = (isLoading) => ({
  type: SET_LOADING_STATE,
  isLoading,
});

export const setNotifications = (data) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  data,
});

export const fetchNotifications = () => {
  return async (dispatch) => {
    dispatch(setLoadingState(true));

    try {
      const response = await fetch('/notifications.json');
      if (response.ok) {
        const data = await response.json();
        dispatch(setNotifications(data));
      } else {
        console.error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      dispatch(setLoadingState(false));
    }
  };
};

export const bindNotificationActionCreators = (dispatch) => ({
  boundMarkAsRead: (index) => dispatch(markAsRead(index)),
  boundSetNotificationFilter: (filter) => dispatch(setNotificationFilter(filter)),
  boundFetchNotifications: () => dispatch(fetchNotifications()),
});
