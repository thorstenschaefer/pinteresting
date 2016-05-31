import { PinterestingPage } from './app.po';

describe('pinteresting App', function() {
  let page: PinterestingPage;

  beforeEach(() => {
    page = new PinterestingPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('pinteresting works!');
  });
});
