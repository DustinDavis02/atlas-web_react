import { Map } from 'immutable';
import notificationReducer from './notificationReducer';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER, NotificationTypeFilters } from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  const initialState = Map({
    notifications: Map(),
    filter: NotificationTypeFilters.DEFAULT,
  });

  it('should return the initial state when no action is passed', () => {
    expect(notificationReducer(undefined, {}).toJS()).toEqual(initialState.toJS());
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS and return the data with isRead set to false', () => {
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', value: 'New data available' }
      ],
    };
    const expectedState = {
      filter: NotificationTypeFilters.DEFAULT,
      notifications: {
        '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
        '2': { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
        '3': { id: 3, type: 'urgent', value: 'New data available', isRead: false }
      },
    };
    expect(notificationReducer(undefined, action).toJS()).toEqual(expectedState);
  });

  it('should handle MARK_AS_READ and update the correct notification', () => {
    const initialState = Map({
      filter: NotificationTypeFilters.DEFAULT,
      notifications: Map({
        '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
        '2': { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
        '3': { id: 3, type: 'urgent', value: 'New data available', isRead: false }
      }),
    });
    const action = {
      type: MARK_AS_READ,
      index: 2,
    };
    const expectedState = {
      filter: NotificationTypeFilters.DEFAULT,
      notifications: {
        '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
        '2': { id: 2, type: 'urgent', value: 'New resume available', isRead: true },
        '3': { id: 3, type: 'urgent', value: 'New data available', isRead: false }
      },
    };
    expect(notificationReducer(initialState, action).toJS()).toEqual(expectedState);
  });

  it('should handle SET_TYPE_FILTER and update the filter', () => {
    const action = {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    };
    const expectedState = {
      filter: NotificationTypeFilters.URGENT,
      notifications: {},
    };
    expect(notificationReducer(undefined, action).toJS()).toEqual(expectedState);
  });
});
