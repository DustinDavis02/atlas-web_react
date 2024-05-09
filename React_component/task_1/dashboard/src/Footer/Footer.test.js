import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

jest.mock('../utils/utils', () => ({
  getFullYear: jest.fn(() => '2024'),
  getFooterCopy: jest.fn(() => 'Holberton School')
}));

describe('Footer', () => {
  it('renders without crashing', () => {
    shallow(<Footer />);
  });

  it('renders correct copyright text', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('p').text()).toBe('2024 - Holberton School');
  });
});