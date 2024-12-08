import { expect } from 'playwright/test';
import { testBrowser } from '../initializer/testBrowser';
import { PageElementFactory } from '../test/htmlElements/pageElementFactory';

export default class CommonActions {
  private static instance: CommonActions | null = null;

  public static getInstance(): CommonActions {
    if (!CommonActions.instance) {
      return new CommonActions();
    }

    return CommonActions.instance;
  }

  public elements = {
    ...PageElementFactory.createCommonPageElements(),
  };

  async goto(url: string) {
    await testBrowser.currentTab.goto(url, {
      waitUntil: 'domcontentloaded',
    });
  }

  async inputText(label: string, value?: string) {
    const inputElm = testBrowser.currentTab
      .locator(this.elements.textInputContainer, {
        has: testBrowser.currentTab.locator('label', { hasText: label }),
      })
      .last()
      .locator('input');
    await inputElm.fill('');
    await inputElm.fill(value || '');
  }

  async clickButton(label: string) {
    await testBrowser.currentTab.locator('button', { hasText: label }).first().click();
  }

  async inputTextWithPlaceHolder(placeHolder: string, value: string) {
    const inputElm = testBrowser.currentTab.locator(`input[placeholder='${placeHolder}']`);
    await inputElm.fill(value);
  }

  async sleep(seconds: number) {
    await testBrowser.currentTab.waitForTimeout(seconds * 1000);
  }

  async clickPencilButton({ sectionName, order }: { sectionName: string; order: number }) {
    if (sectionName.includes('-')) {
      await testBrowser.currentTab
        .locator(`div[class*=${sectionName}]`)
        .locator("a[class*='edit']")
        .nth(order + 1)
        .click();
      return;
    }
    await testBrowser.currentTab
      .locator("div[class*='card-container']", {
        has: testBrowser.currentTab.locator("div[class*='card-title']", { hasText: sectionName }),
      })
      .locator("a[class*='edit']")
      .nth(order)
      .click();
  }

  async clickEditSection(sectionName: string) {
    await testBrowser.currentTab
      .locator('div', {
        has: testBrowser.currentTab.locator('label', { hasText: sectionName }),
      })
      .last()
      .locator('button')
      .click();
  }

  async checkJobTitle(jobTitle: string) {
    const jobItems = testBrowser.currentTab.locator("div[class*='job-item-company-data']");
    const promises = [];
    for (let i = 0; i < 50; i++) {
      const jobItem = jobItems.nth(i);
      promises.push(expect(jobItem.locator('h3')).toContainText(jobTitle, { ignoreCase: true }));
    }
    await Promise.any(promises);
  }

  async checkMessage(message: string) {
    await expect(
      testBrowser.currentTab.locator("div[class*='no-search-results-wrapper']", { hasText: message }),
    ).toBeVisible({ timeout: 8000 });
  }

  async checkDialogAppear(dialogName: string) {
    await expect(
      testBrowser.currentTab.locator("div[role^='dialog']").locator('header', { hasText: dialogName }),
    ).toBeVisible({ timeout: 2000 });
  }

  async checkErrorMessage(errMsg: string, fieldName: string) {
    await expect(
      testBrowser.currentTab
        .locator(this.elements.textInputContainer, {
          has: testBrowser.currentTab.locator('label', { hasText: fieldName }),
        })
        .locator(`p[id*=error-message]`, { hasText: errMsg }),
    ).toBeVisible({ timeout: 2000 });
  }

  async checkDisappear(dialogName: string) {
    await expect(
      testBrowser.currentTab.locator("div[role^='dialog']").locator('header', { hasText: dialogName }),
    ).toBeHidden({ timeout: 6000 });
  }

  async selectOption({ optionName, itemOrder }: { optionName?: string; itemOrder?: number }) {
    if (optionName) {
      await testBrowser.currentTab.locator('div:has(> ul)').last().locator('li', { hasText: optionName }).click();
      return;
    }
    await testBrowser.currentTab
      .locator('div:has(> ul)')
      .last()
      .locator('li')
      .nth(itemOrder ?? 0)
      .click();
  }

  async fillAndSelect({
    fillValue,
    selectValue,
    fieldName,
  }: {
    fillValue: string;
    selectValue: string;
    fieldName: string;
  }) {
    const fieldContainer = testBrowser.currentTab
      .locator('div', {
        has: testBrowser.currentTab.locator('label', { hasText: fieldName }),
      })
      .last();
    const inputElm = fieldContainer.locator('input');
    await inputElm.fill('');
    await inputElm.fill(fillValue);
    const selectedItem = fieldContainer.locator('ul > li', { hasText: selectValue });
    await expect(selectedItem).toBeVisible({ timeout: 10000 });
    await selectedItem.click();
  }

  async clickDialogTitle(dialogName: string) {
    await testBrowser.currentTab.locator("div[role^='dialog']").locator('header', { hasText: dialogName }).click();
  }

  async clickPlusButton(sectionName: string) {
    await testBrowser.currentTab
      .locator("div[class*='card-title']", {
        hasText: sectionName,
      })
      .getByRole('button')
      .first()
      .click();
  }

  async clickTab(tabName: string) {
    const tabListContainer = testBrowser.currentTab.locator("div[role='tablist']");
    await tabListContainer.locator('div', { hasText: tabName }).click();
    return;
  }
}
