import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('Notifications', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Notifications />);
  });

  it('renders NotificationItem components', () => {
    expect(wrapper.find(NotificationItem).length).toBeGreaterThan(0);
  });

  it('first NotificationItem renders the right html', () => {
    const firstItem = wrapper.find(NotificationItem).first();
    expect(firstItem.props().type).toEqual("default");
    expect(firstItem.props().value).toEqual("New course available");
  });
});