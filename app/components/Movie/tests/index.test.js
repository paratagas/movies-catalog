import React from 'react';
import { shallow, mount } from 'enzyme';
import Movie from '../index';

describe('<Movie />', () => {
  it('handles clicks', () => {
    const onClickSpy = jest.fn();
    const renderedComponent = shallow(<Movie onClickHandler={onClickSpy} />);
    renderedComponent.find('img').first().simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
