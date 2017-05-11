import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';

export class CommonPage {
  private button: ElementFinder;
  private langs: ElementArrayFinder;
  private curLang: ElementFinder;

  constructor() {
    this.button = element(by.tagName('app-lang'));
    this.langs = this.button
      .all(by.css('div.dropdown-menu > button'));
    this.curLang = this.button.element(by.css('div > span'));
  }

  navigateTo() {
    return browser.get('/');
  }

  title() {
    return browser.getTitle();
  }

  changeLocaleByName(name: string) {
    const imgs = this.button
      .all(by.css('div.dropdown-menu > button > img'));
    imgs.then(items => {
      for (let i = 0; i < items.length; i++) {
        items[i].getAttribute('alt').then(v => {
          if (v === name.toUpperCase()) {
            this.button.click();
            this.langs.get(i).click();
            return;
          }
        });
      }
    });
  }

  private localeName(l) {
    return l.element(by.tagName('span')).getText();
  }

  test() {
    this.changeLocaleByName('uk');
    expect(this.curLang.getText()).toEqual('Українська');
    this.changeLocaleByName('en');
    expect(this.curLang.getText()).toEqual('English');
    this.changeLocaleByName('ru');
    expect(this.curLang.getText()).toEqual('Русский');

    this.langs.then(items => {
      expect(items.length).toBe(3);
      let localeName;
      for (const l of items) {
        this.button.click();
        localeName = this.localeName(l);
        l.click();
        expect(this.curLang.getText()).toEqual(localeName);

        localeName.then(localeText => {
          const span = element(by.id('exit'));
          switch (localeText) {
            case 'Українська':
              expect(span.getText()).toEqual('Вихід');
              break;
            case 'Русский':
              expect(span.getText()).toEqual('Выход');
              break;
            case 'English':
              expect(span.getText()).toEqual('Exit');
              break;
          }
        });
      }
    });
  }
}
