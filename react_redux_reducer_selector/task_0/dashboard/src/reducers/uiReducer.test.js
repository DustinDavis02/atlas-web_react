import uiReducer from './uiReducer';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SELECT_COURSE
} from '../actions/uiActionTypes';

describe('uiReducer', () => {
  const initialState = {
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {},
  };

  it('should return the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the initial state when the action SELECT_COURSE is passed', () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE })).toEqual(initialState);
  });

  it('should handle DISPLAY_NOTIFICATION_DRAWER correctly', () => {
    const expectedState = {
      ...initialState,
      isNotificationDrawerVisible: true,
    };
    expect(uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER })).toEqual(expectedState);
  });

  it('should handle HIDE_NOTIFICATION_DRAWER correctly', () => {
    const state = {
      ...initialState,
      isNotificationDrawerVisible: true,
    };
    const expectedState = {
      ...initialState,
      isNotificationDrawerVisible: false,
    };
    expect(uiReducer(state, { type: HIDE_NOTIFICATION_DRAWER })).toEqual(expectedState);
  });

  it('should handle LOGIN_SUCCESS correctly', () => {
    const expectedState = {
      ...initialState,
      isUserLoggedIn: true,
    };
    expect(uiReducer(undefined, { type: LOGIN_SUCCESS })).toEqual(expectedState);
  });

  it('should handle LOGIN_FAILURE correctly', () => {
    const expectedState = {
      ...initialState,
      isUserLoggedIn: false,
    };
    expect(uiReducer(undefined, { type: LOGIN_FAILURE })).toEqual(expectedState);
  });

  it('should handle LOGOUT correctly', () => {
    const state = {
      ...initialState,
      isUserLoggedIn: true,
    };
    const expectedState = {
      ...initialState,
      isUserLoggedIn: false,
    };
    expect(uiReducer(state, { type: LOGOUT })).toEqual(expectedState);
  });
});
