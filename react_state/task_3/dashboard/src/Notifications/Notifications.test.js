import React from 'react';
import { mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { act } from 'react';

describe('Notifications', () => {
  let wrapper;
  const mockHandleDisplayDrawer = jest.fn();
  const mockHandleHideDrawer = jest.fn();
  const mockMarkNotificationAsRead = jest.fn();

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    act(() => {
      wrapper = mount(
        <Notifications 
          handleDisplayDrawer={mockHandleDisplayDrawer}
          handleHideDrawer={mockHandleHideDrawer}
          markNotificationAsRead={mockMarkNotificationAsRead}
        />
      );
    });
    wrapper.update();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.clearAllMocks();
  });

  it('renders without crashing with no props', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly if listNotifications is empty', () => {
    act(() => {
      wrapper.setProps({ listNotifications: [] });
    });
    wrapper.update();
    expect(wrapper.find(NotificationItem).length).toBe(0);
    expect(wrapper.text()).toContain("No new notification for now");
    expect(wrapper.text()).not.toContain("Here is the list of notifications");
  });

  it('renders correctly if listNotifications property is not passed', () => {
    expect(wrapper.find(NotificationItem).length).toBe(0);
    expect(wrapper.text()).toContain("No new notification for now");
  });

  it('renders NotificationItem components correctly with data', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' }
    ];
    act(() => {
      wrapper.setProps({ listNotifications: notifications });
    });
    wrapper.update();
    expect(wrapper.find(NotificationItem).length).toEqual(notifications.length);
    expect(wrapper.text()).not.toContain("No new notification for now");
    expect(wrapper.text()).toContain("Here is the list of notifications");
  });

  it('calls markNotificationAsRead when NotificationItem is clicked', () => {
    const notifications = [{ id: 1, type: 'default', value: 'New course available' }];
    act(() => {
      wrapper.setProps({ listNotifications: notifications, markNotificationAsRead: mockMarkNotificationAsRead });
    });
    wrapper.update();
    wrapper.find(NotificationItem).first().props().markAsRead();
    expect(mockMarkNotificationAsRead).toHaveBeenCalledWith(1);
  });

  it('calls handleDisplayDrawer when menu item is clicked', () => {
    act(() => {
      wrapper.find('.menuItem').simulate('click');
    });
    wrapper.update();
    expect(mockHandleDisplayDrawer).toHaveBeenCalled();
  });

  it('calls handleHideDrawer when close button is clicked', () => {
    act(() => {
      wrapper.setState({ displayDrawer: true });
    });
    wrapper.update();
    act(() => {
      wrapper.find('button').simulate('click');
    });
    wrapper.update();
    expect(mockHandleHideDrawer).toHaveBeenCalled();
  });

  it('does not rerender for the same list of notifications', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' }
    ];
    act(() => {
      wrapper.setProps({ listNotifications: notifications });
    });
    wrapper.update();
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({ listNotifications: notifications }, wrapper.state());
    expect(shouldUpdate).toBe(false);
  });

  it('rerenders for a longer list of notifications', () => {
    const initialNotifications = [{ id: 1, type: 'default', value: 'New course available' }];
    const newNotifications = [
      ...initialNotifications,
      { id: 2, type: 'urgent', value: 'New resume available' }
    ];
    act(() => {
      wrapper.setProps({ listNotifications: initialNotifications });
    });
    wrapper.update();
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({ listNotifications: newNotifications }, wrapper.state());
    expect(shouldUpdate).toBe(true);
  });
});
