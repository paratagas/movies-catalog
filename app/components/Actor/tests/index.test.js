import React from 'react';
import { shallow } from 'enzyme';
import Actor from '../index';

describe('<Actor />', () => {
  it('renders a <div>', () => {
    const renderedComponent = shallow(<Actor />);
    expect(renderedComponent.find('div').node).toBeDefined();
  });

  /* it('renders wrapper div', () => {
    expect(shallow(<Actor />).find('div.actor').length).toBe(1);
  }); */
});
