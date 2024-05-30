import uiReducer from './uiReducer';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SELECT_COURSE
} from '../actions/uiActionTypes';
import { Map } from 'immutable';

describe('uiReducer', () => {
  const initialState = Map({
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {},
  });

  it('should return the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {}).toJS()).toEqual(initialState.toJS());
  });

  it('should return the initial state when the action SELECT_COURSE is passed', () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE }).toJS()).toEqual(initialState.toJS());
  });

  it('should handle DISPLAY_NOTIFICATION_DRAWER correctly', () => {
    const expectedState = initialState.set('isNotificationDrawerVisible', true);
    expect(uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER }).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle HIDE_NOTIFICATION_DRAWER correctly', () => {
    const state = initialState.set('isNotificationDrawerVisible', true);
    const expectedState = initialState.set('isNotificationDrawerVisible', false);
    expect(uiReducer(state, { type: HIDE_NOTIFICATION_DRAWER }).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle LOGIN_SUCCESS correctly', () => {
    const expectedState = initialState.set('isUserLoggedIn', true);
    expect(uiReducer(undefined, { type: LOGIN_SUCCESS }).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle LOGIN_FAILURE correctly', () => {
    const expectedState = initialState.set('isUserLoggedIn', false);
    expect(uiReducer(undefined, { type: LOGIN_FAILURE }).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle LOGOUT correctly', () => {
    const state = initialState.set('isUserLoggedIn', true);
    const expectedState = initialState.set('isUserLoggedIn', false);
    expect(uiReducer(state, { type: LOGOUT }).toJS()).toEqual(expectedState.toJS());
  });
});
