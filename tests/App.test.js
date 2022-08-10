import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/App';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders app successfully', () => {
    shallow(<App />);
  });
});
