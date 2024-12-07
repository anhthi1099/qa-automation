import { chromium, firefox, webkit, LaunchOptions } from 'playwright';

const options: LaunchOptions = {
  headless: false,
  slowMo: 1000,
};

export const invokeBrowser = () => {
  const browserType = process.env.npm_config_testbrowser || process.env.BROWSER;
  const head = process.env.HEAD;
  switch (browserType) {
    case 'chrome':
      return chromium.launch({
        ...options,
        headless: head === 'true' ? true : false,
      });
    case 'firefox':
      return firefox.launch({
        ...options,
        headless: head === 'true' ? true : false,
      });
    case 'webkit':
      return webkit.launch({
        ...options,
        headless: head === 'true' ? true : false,
      });
    default:
      throw new Error('Please set the proper browser');
  }
};
