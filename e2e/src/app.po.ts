import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getImportText(): Promise<string> {
    return element(by.css('app-root app-editor .editor-container mat-card .padding-top-elt button')).getText() as Promise<string>;
  }
}
