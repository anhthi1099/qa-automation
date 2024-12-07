import { BrowserContext, Page } from 'playwright';
import { Logger } from 'winston';

export const testBrowser = {
  currentTab: undefined as unknown as Page,
  tabList: [] as Page[],
  context: undefined as unknown as BrowserContext,
  logger: undefined as unknown as Logger,
  apiWaitList: {} as Record<string, boolean>,
};
