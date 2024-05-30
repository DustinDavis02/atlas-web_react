import {
    login,
    logout,
    displayNotificationDrawer,
    hideNotificationDrawer,
  } from './uiActionCreators';
  import {
    LOGIN,
    LOGOUT,
    DISPLAY_NOTIFICATION_DRAWER,
    HIDE_NOTIFICATION_DRAWER,
  } from './uiActionTypes';
  
  describe('uiActionCreators', () => {
    it('login should create an action to log in', () => {
      const email = 'test@example.com';
      const password = 'password';
      const expectedAction = {
        type: LOGIN,
        user: { email, password },
      };
      expect(login(email, password)).toEqual(expectedAction);
    });
  
    it('logout should create an action to log out', () => {
      const expectedAction = { type: LOGOUT };
      expect(logout()).toEqual(expectedAction);
    });
  
    it('displayNotificationDrawer should create an action to display the notification drawer', () => {
      const expectedAction = { type: DISPLAY_NOTIFICATION_DRAWER };
      expect(displayNotificationDrawer()).toEqual(expectedAction);
    });
  
    it('hideNotificationDrawer should create an action to hide the notification drawer', () => {
      const expectedAction = { type: HIDE_NOTIFICATION_DRAWER };
      expect(hideNotificationDrawer()).toEqual(expectedAction);
    });
  });