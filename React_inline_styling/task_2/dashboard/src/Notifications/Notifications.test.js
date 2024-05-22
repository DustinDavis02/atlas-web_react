import React from 'react';
import { mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('Notifications', () => {
  let wrapper;
  const mockMarkAsRead = jest.fn();

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    wrapper = mount(<Notifications />);
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.clearAllMocks();
  });

  it('renders without crashing with no props', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly if listNotifications is empty', () => {
    wrapper = mount(<Notifications listNotifications={[]} />);
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
    wrapper = mount(<Notifications listNotifications={notifications} />);
    expect(wrapper.find(NotificationItem).length).toEqual(notifications.length);
    expect(wrapper.text()).not.toContain("No new notification for now");
    expect(wrapper.text()).toContain("Here is the list of notifications");
  });

  it('calls markAsRead when NotificationItem is clicked', () => {
    const notifications = [{ id: 1, type: 'default', value: 'New course available' }];
    wrapper = mount(<Notifications listNotifications={notifications} markAsRead={mockMarkAsRead} />);
    wrapper.find(NotificationItem).first().props().onClick();
    expect(mockMarkAsRead).toHaveBeenCalledWith(1);
  });

  it('does not rerender for the same list of notifications', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' }
    ];
    wrapper = mount(<Notifications listNotifications={notifications} />);
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({ listNotifications: notifications }, wrapper.state());
    expect(shouldUpdate).toBe(false);
  });

  it('rerenders for a longer list of notifications', () => {
    const initialNotifications = [{ id: 1, type: 'default', value: 'New course available' }];
    const newNotifications = [
      ...initialNotifications,
      { id: 2, type: 'urgent', value: 'New resume available' }
    ];
    wrapper = mount(<Notifications listNotifications={initialNotifications} />);
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({ listNotifications: newNotifications }, wrapper.state());
    expect(shouldUpdate).toBe(true);
  });
});
