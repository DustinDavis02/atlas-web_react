import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import { App, mapStateToProps } from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';

const mockStore = configureStore([thunk]);

describe('App', () => {
  let wrapper;
  let store;
  let mockProps;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    store = mockStore({
      isUserLoggedIn: false,
      isNotificationDrawerVisible: false,
    });

    mockProps = {
      displayDrawer: false,
      displayNotificationDrawer: jest.fn(),
      hideNotificationDrawer: jest.fn(),
      loginRequest: jest.fn(),
      logout: jest.fn(),
    };

    wrapper = shallow(<App {...mockProps} />);
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('contains the Notifications component', () => {
    expect(wrapper.find(Notifications).exists()).toBe(true);
  });

  it('contains the Header component', () => {
    expect(wrapper.find(Header).exists()).toBe(true);
  });

  it('contains the Login component', () => {
    expect(wrapper.find(Login).exists()).toBe(true);
  });

  it('contains the Footer component', () => {
    expect(wrapper.find(Footer).exists()).toBe(true);
  });

  it('calls logOut and shows alert on ctrl+h', () => {
    const event = {
      ctrlKey: true,
      key: 'h',
      preventDefault: jest.fn(),
    };

    wrapper.instance().handleKeyDown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Logging you out');
  });
});

describe('mapStateToProps', () => {
  it('should return the right object', () => {
    const state = fromJS({
      isUserLoggedIn: true,
      isNotificationDrawerVisible: false,
    });
    const expectedProps = {
      isLoggedIn: true,
      displayDrawer: false,
    };
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
