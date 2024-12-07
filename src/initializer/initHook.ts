import { BeforeAll, AfterAll, Before, After, AfterStep, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext, devices } from 'playwright';
import { API_WAIT_LIST } from '../helper/constant/common';
import { testBrowser } from './testBrowser';
import { invokeBrowser } from '../helper/browsers/browserManager';
import { getEnv } from '../helper/env/env';
import { createLogger } from 'winston';
import { options } from '../helper/util/logger';
import { trimExcessWhiteSpace } from '../helper/util/commonHandle';
import path from 'path';
import fs from 'fs-extra';

const DEFAULT_TIMEOUT = 180000;
let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(DEFAULT_TIMEOUT);

function initPageFixture(page: Page, scenarioName: string) {
  testBrowser.currentTab = page;
  testBrowser.context = context;
  testBrowser.currentTab.on('request', (request) => {
    API_WAIT_LIST.forEach((apiSegment) => {
      if (request.url().includes(apiSegment)) {
        testBrowser.apiWaitList = { ...testBrowser.apiWaitList, [apiSegment]: true };
      }
    });
  });
  testBrowser.currentTab.on('response', (response) => {
    API_WAIT_LIST.forEach((apiSegment) => {
      if (response.url().includes(apiSegment) && ['200', '201'].includes(response.status().toString())) {
        testBrowser.apiWaitList = { ...testBrowser.apiWaitList, [apiSegment]: false };
      }
    });
  });
  testBrowser.logger = createLogger(options(scenarioName));
  testBrowser.tabList.push(page);

  testBrowser.context.on('page', async (newPage) => {
    testBrowser.currentTab = newPage;
    testBrowser.tabList.push(newPage);
    await testBrowser.currentTab.bringToFront();

    testBrowser.currentTab.on('close', () => {
      testBrowser.tabList.pop();
      testBrowser.currentTab = testBrowser.tabList[testBrowser.tabList.length - 1];
    });
  });
}

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  const scenarioName = trimExcessWhiteSpace(pickle.name) + pickle.id;

  const desktop = devices['Desktop Chrome'];
  // const basicAuth = {
  //   username: process.env.BASIC_AUTH_USERNAME ?? 'test',
  //   password: process.env.BASIC_AUTH_PASSWORD ?? 'Abc12345',
  // };

  context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    userAgent: desktop.userAgent,
    recordVideo: {
      dir: 'test-result/videos',
    },
    // httpCredentials: basicAuth, //HTTP Authentication Dialog: https://playwright.dev/docs/network#http-authentication
  });

  const page: Page = await context.newPage();

  initPageFixture(page, scenarioName);
});

AfterStep(async function screenshotOnFail({ pickle, result }) {
  if (Status.FAILED === result?.status) {
    const img = await testBrowser.currentTab.screenshot({
      path: `./test-result/screenshots/failed/${trimExcessWhiteSpace(pickle.name)}.png`,
      type: 'png',
    });

    this.attach(img, 'image/png');
  }
});

After(async function ({ pickle }) {
  const img = await testBrowser.currentTab.screenshot({
    path: `./test-result/screenshots/passed/${trimExcessWhiteSpace(pickle.name)}.png`,
    type: 'png',
  });

  const timestamp = new Date().getTime();
  const newVideoName = `./test-result/videos/${trimExcessWhiteSpace(pickle.name)}_${timestamp}.webm`;

  const videoPath = await testBrowser.currentTab.video()?.path();

  if (videoPath) {
    await fs.rename(videoPath, newVideoName);
  }

  await testBrowser.currentTab.close();
  await context.close();

  this.attach(img, 'image/png');
  this.attach(fs.readFileSync(path.join(__dirname, `../.${newVideoName}`)), 'video/webm');
});

AfterAll(async function () {
  await browser.close();
  if (testBrowser.logger) {
    testBrowser.logger.close();
  }
});
