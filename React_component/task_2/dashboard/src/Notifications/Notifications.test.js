import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('Notifications', () => {
  let wrapper;
  const mockMarkAsRead = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Notifications />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing with no props', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly if listNotifications is empty', () => {
    wrapper = shallow(<Notifications listNotifications={[]} />);
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
    wrapper = shallow(<Notifications listNotifications={notifications} />);
    expect(wrapper.find(NotificationItem).length).toEqual(notifications.length);
    expect(wrapper.text()).not.toContain("No new notification for now");
    expect(wrapper.text()).toContain("Here is the list of notifications");
  });

  it('calls markAsRead when NotificationItem is clicked', () => {
    const notifications = [{ id: 1, type: 'default', value: 'New course available' }];
    const wrapper = shallow(<Notifications listNotifications={notifications} markAsRead={mockMarkAsRead} />);
    const firstItem = wrapper.find(NotificationItem).first();
    firstItem.simulate('click');
    expect(mockMarkAsRead).toHaveBeenCalledWith(1);
  });
});
