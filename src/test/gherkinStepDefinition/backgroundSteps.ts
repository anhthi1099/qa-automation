import { Before, Given, When } from '@cucumber/cucumber';
import accounts from '../../.auth/accounts.json';
import CommonActions from '../../actions/commonActions';

let commonActions: CommonActions;

Before(async function () {
  commonActions = CommonActions.getInstance();
});

Given('I login to the application as {string}', async (email: string) => {
  const selectedAccount = accounts.accounts.find((account) => account.username === email);
  await commonActions.goto(process.env.BASEURL);
  await commonActions.inputText('Email', selectedAccount?.username);
  await commonActions.inputText('Password', selectedAccount?.password);
  await commonActions.clickButton('Log in');
});

When('Page sleep for {int} seconds', async (seconds: number) => {
  await commonActions.sleep(seconds);
});
