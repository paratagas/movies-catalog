import defineMessages from '../messages';

describe('Home page messages', () => {
  it('has correct structure', () => {
    expect(defineMessages).toHaveProperty('pageTitle');
  });
});
