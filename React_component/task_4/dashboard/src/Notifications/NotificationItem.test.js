import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  it('renders without crashing', () => {
    shallow(<NotificationItem type="default" value="test" />);
  });

  it('renders the correct html from value prop', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper.text()).toContain("test");
  });

  it('renders the correct html from html prop', () => {
    const htmlData = { __html: '<u>test</u>' };
    const wrapper = shallow(<NotificationItem type="default" html={htmlData} />);
    expect(wrapper.html()).toContain('<u>test</u>');
  });

  it('triggers markAsRead when clicked', () => {
    const markAsReadMock = jest.fn();
    const wrapper = shallow(<NotificationItem type="default" value="test" id={123} markAsRead={markAsReadMock} />);
    wrapper.find('li').simulate('click');
    expect(markAsReadMock).toHaveBeenCalledWith(123);
  });
});
