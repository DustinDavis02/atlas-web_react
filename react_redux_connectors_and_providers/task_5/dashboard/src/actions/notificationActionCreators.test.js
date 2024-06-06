import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  markAsRead,
  setNotificationFilter,
  setLoadingState,
  setNotifications,
  fetchNotifications,
} from './notificationActionCreators';
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS,
  NotificationTypeFilters,
} from './notificationActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('notificationActionCreators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('markAsRead should create an action to mark a notification as read', () => {
    const index = 1;
    const expectedAction = {
      type: MARK_AS_READ,
      index,
    };
    expect(markAsRead(index)).toEqual(expectedAction);
  });

  it('setNotificationFilter should create an action to set the notification filter', () => {
    const filter = NotificationTypeFilters.DEFAULT;
    const expectedAction = {
      type: SET_TYPE_FILTER,
      filter,
    };
    expect(setNotificationFilter(filter)).toEqual(expectedAction);
  });

  it('setLoadingState should create an action to set loading state', () => {
    const expectedAction = {
      type: SET_LOADING_STATE,
      isLoading: true,
    };
    expect(setLoadingState(true)).toEqual(expectedAction);
  });

  it('setNotifications should create an action to set notifications', () => {
    const data = [{ id: 1, type: 'default', value: 'New course available' }];
    const expectedAction = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data,
    };
    expect(setNotifications(data)).toEqual(expectedAction);
  });

  it('fetchNotifications should dispatch setLoadingState and setNotifications actions', () => {
    const data = [{ id: 1, type: 'default', value: 'New course available' }];
    fetchMock.getOnce('/notifications.json', {
      body: data,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: SET_LOADING_STATE, isLoading: true },
      { type: FETCH_NOTIFICATIONS_SUCCESS, data },
      { type: SET_LOADING_STATE, isLoading: false },
    ];
    const store = mockStore({});

    return store.dispatch(fetchNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
