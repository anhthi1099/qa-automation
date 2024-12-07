module.exports = {
  default: {
    tags: process.env.npm_config_tags || '@LoginFlow',
    formatOptions: {
      snippetInterface: 'async-await',
    },
    paths: ['src/test/scenarios/**/**.feature'],
    dryRun: false,
    require: ['src/initializer/initHook.ts', 'src/test/gherkinStepDefinition/**.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:test-result/cucumber-report.html',
      'json:test-result/cucumber-report.json',
      // 'rerun:@rerun.txt',
    ],
    parallel: 4,
  },
  rerun: {
    formatOptions: {
      snippetInterface: 'async-await',
    },
    dryRun: false,
    require: ['src/hooks/hooks.ts', 'src/test/steps/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:test-result/cucumber-report.html',
      'json:test-result/cucumber-report.json',
      'rerun:@rerun.txt',
    ],
    parallel: 4,
  },
};
