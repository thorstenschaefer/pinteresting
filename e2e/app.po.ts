export class PinterestingPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pinteresting-app h1')).getText();
  }
}
