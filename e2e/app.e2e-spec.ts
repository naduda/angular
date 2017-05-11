import { LangPage } from './app.po';

describe('lang App', () => {
  let page: LangPage;

  beforeEach(() => {
    page = new LangPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
