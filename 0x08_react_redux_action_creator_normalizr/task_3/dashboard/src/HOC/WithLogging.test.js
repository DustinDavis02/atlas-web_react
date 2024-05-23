import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';

describe('WithLogging HOC', () => {
    it('should log correct messages on mount and unmount with pure HTML', () => {
      console.log = jest.fn();
  
      const Component = WithLogging(() => <p />);
      const wrapper = mount(<Component />);
      
      expect(console.log).toHaveBeenCalledWith('Component Component is mounted');
  
      wrapper.unmount();
      expect(console.log).toHaveBeenCalledWith('Component Component is going to unmount');
    });
  
    it('should log correct messages on mount and unmount with Login component', () => {
      console.log = jest.fn();
      

      const Login = () => <div>Login</div>;
      Login.displayName = 'Login';
  
      const WrappedLogin = WithLogging(Login);
      const wrapper = mount(<WrappedLogin />);
      
      expect(console.log).toHaveBeenCalledWith('Component Login is mounted');
      
      wrapper.unmount();
      expect(console.log).toHaveBeenCalledWith('Component Login is going to unmount');
    });
  });