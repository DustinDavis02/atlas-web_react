import React from 'react';
import { mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import { App, mapStateToProps } from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import { act } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { fromJS } from 'immutable';
import uiReducer from '../reducers/uiReducer';

describe('App', () => {
  let wrapper;
  let mockLogOut;
  let alertMock;
  let store;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    mockLogOut = jest.fn();
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    store = createStore(uiReducer);

    act(() => {
      wrapper = mount(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });
    wrapper.update();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    alertMock.mockRestore();
  });

  it('renders without crashing', () => {
    expect(wrapper).not.toBeNull();
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
      preventDefault: jest.fn()
    };
    act(() => {
      wrapper.find(App).instance().handleKeyDown(event);
    });
    wrapper.update();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
  });

  it('updates the state correctly when logIn is called', () => {
    act(() => {
      wrapper.find(App).instance().logIn('test@test.com', 'password');
    });
    wrapper.update();
    expect(wrapper.find(App).instance().state.user.email).toBe('test@test.com');
    expect(wrapper.find(App).instance().state.user.password).toBe('password');
    expect(wrapper.find(App).instance().state.user.isLoggedIn).toBe(true);
  });

  it('updates the state correctly when logOut is called', () => {
    act(() => {
      wrapper.find(App).instance().logIn('test@test.com', 'password');
      wrapper.find(App).instance().logOut();
    });
    wrapper.update();
    expect(wrapper.find(App).instance().state.user).toEqual({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  });

  it('removes notification from state when markNotificationAsRead is called', () => {
    act(() => {
      wrapper.find(App).instance().setState({
        listNotifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' }
        ]
      });
    });
    wrapper.update();
    act(() => {
      wrapper.find(App).instance().markNotificationAsRead(1);
    });
    wrapper.update();
    expect(wrapper.find(App).instance().state.listNotifications).toEqual([
      { id: 2, type: 'urgent', value: 'New resume available' }
    ]);
  });
});

describe('mapStateToProps', () => {
  it('should return the right object', () => {
    const state = fromJS({
      isUserLoggedIn: true,
      isNotificationDrawerVisible: false
    });
    const expectedProps = {
      isLoggedIn: true,
      displayDrawer: false
    };
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
