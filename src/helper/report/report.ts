/* eslint-disable @typescript-eslint/no-var-requires */
const report = require('multiple-cucumber-html-reporter');

const currentDate = new Date();

report.generate({
  jsonDir: './test-result',
  reportPath: './test-result/report',
  reportName: 'Automation Report',
  pageTitle: 'E-com',
  displayDuration: false,
  metadata: {
    browser: {
      name: 'chrome',
      version: '112',
    },
    device: 'Local test machine',
    platform: {
      name: 'osx',
      version: '11.6',
    },
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Test project' },
      { label: 'Release', value: '1.2.3' },
      { label: 'Cycle', value: 'Smoke-123' },
      { label: 'Execution Start Time', value: currentDate.toUTCString() },
      { label: 'Execution End Time', value: currentDate.toUTCString() },
    ],
  },
});
