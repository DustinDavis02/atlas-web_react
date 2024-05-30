import React from 'react';
import { mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import App from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import { act } from 'react';

describe('App', () => {
  let wrapper;
  let mockLogOut;
  let alertMock;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    mockLogOut = jest.fn();
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    act(() => {
      wrapper = mount(<App />);
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
      wrapper.instance().handleKeyDown(event);
    });
    wrapper.update();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
  });

  it('has default state displayDrawer as false', () => {
    expect(wrapper.state().displayDrawer).toBe(false);
  });

  it('sets displayDrawer to true when handleDisplayDrawer is called', () => {
    act(() => {
      wrapper.instance().handleDisplayDrawer();
    });
    wrapper.update();
    expect(wrapper.state().displayDrawer).toBe(true);
  });

  it('sets displayDrawer to false when handleHideDrawer is called', () => {
    act(() => {
      wrapper.instance().handleDisplayDrawer();
      wrapper.instance().handleHideDrawer();
    });
    wrapper.update();
    expect(wrapper.state().displayDrawer).toBe(false);
  });

  it('updates the state correctly when logIn is called', () => {
    act(() => {
      wrapper.instance().logIn('test@test.com', 'password');
    });
    wrapper.update();
    expect(wrapper.state().user.email).toBe('test@test.com');
    expect(wrapper.state().user.password).toBe('password');
    expect(wrapper.state().user.isLoggedIn).toBe(true);
  });

  it('updates the state correctly when logOut is called', () => {
    act(() => {
      wrapper.instance().logIn('test@test.com', 'password');
      wrapper.instance().logOut();
    });
    wrapper.update();
    expect(wrapper.state().user).toEqual({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  });

  it('removes notification from state when markNotificationAsRead is called', () => {
    act(() => {
      wrapper.setState({
        listNotifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' }
        ]
      });
    });
    wrapper.update();
    act(() => {
      wrapper.instance().markNotificationAsRead(1);
    });
    wrapper.update();
    expect(wrapper.state().listNotifications).toEqual([
      { id: 2, type: 'urgent', value: 'New resume available' }
    ]);
  });
});
