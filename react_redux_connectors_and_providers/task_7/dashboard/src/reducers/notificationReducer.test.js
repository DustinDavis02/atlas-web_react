import { Map } from 'immutable';
import notificationReducer from './notificationReducer';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE, NotificationTypeFilters } from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  const initialState = Map({
    notifications: Map(),
    filter: NotificationTypeFilters.DEFAULT,
    loading: false,
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
      loading: false,
      notifications: Map({
        '1': Map({ id: 1, type: 'default', value: 'New course available', isRead: false }),
        '2': Map({ id: 2, type: 'urgent', value: 'New resume available', isRead: false }),
        '3': Map({ id: 3, type: 'urgent', value: 'New data available', isRead: false })
      }).toJS()
    };
    expect(notificationReducer(undefined, action).toJS()).toEqual(expectedState);
  });

  it('should handle MARK_AS_READ and update the correct notification', () => {
    const state = initialState.set('notifications', Map({
      '1': Map({ id: 1, type: 'default', value: 'New course available', isRead: false }),
      '2': Map({ id: 2, type: 'urgent', value: 'New resume available', isRead: false }),
      '3': Map({ id: 3, type: 'urgent', value: 'New data available', isRead: false })
    }));
    const action = {
      type: MARK_AS_READ,
      index: 2,
    };
    const expectedState = state.setIn(['notifications', '2', 'isRead'], true);
    expect(notificationReducer(state, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle SET_TYPE_FILTER and update the filter', () => {
    const action = {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    };
    const expectedState = initialState.set('filter', NotificationTypeFilters.URGENT);
    expect(notificationReducer(undefined, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle SET_LOADING_STATE and update the loading state', () => {
    const action = {
      type: SET_LOADING_STATE,
      loading: true,
    };
    const expectedState = initialState.set('loading', true);
    expect(notificationReducer(undefined, action).toJS()).toEqual(expectedState.toJS());
  });
});
