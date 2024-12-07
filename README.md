# Environment Requirements:

- Minimum NodeJS version: 16

# Install:

- $ npm install
- $ npx playwright install

## How to run?

- $ npm run test:internal
- $ npm run run test
- $ PWDEBUG=1 npm run test

## How to run on Windows?

- $ npm run test:windows

## How to generate report?

- $ npm run report

## Run by tags

- $ npm run test --BROWSER=firefox
- $ npm run test --TAGS=@smoke
- $ npm run test --TAGS=@support and @prices
- $ npm run test:stg --TAGS=@stage and @myschedule

## Config

- Refer: https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md

## Mix some elements

- Refer: https://playwright.dev/docs/other-locators

## HTTP Authentication Dialog: (Use for Internal Test ENV)

- Refer: https://playwright.dev/docs/network#http-authentication
