import { CommonPage } from './app.po';

describe('Common Module', () => {
  let page: CommonPage;

  beforeEach(() => {
    page = new CommonPage();
    page.navigateTo();
  });

  it('should has correct title', () => {
    expect(page.title()).toEqual('Common Module');
  });

  it('check translation', () => {
    page.test();
  });
});
