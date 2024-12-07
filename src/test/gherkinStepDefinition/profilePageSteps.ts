import { Before, When, Then } from '@cucumber/cucumber';
import CommonActions from '../../actions/commonActions';
import { convertWordToNumber } from '../../helper/util/commonHandle';

let commonActions: CommonActions;

Before(async function () {
  commonActions = CommonActions.getInstance();
});

When('I input {string} to the input with {string} placeholder', async (text: string, placeholder: string) => {
  await commonActions.inputTextWithPlaceHolder(placeholder, text);
});

When('I click the {string} button', async (buttonName: string) => {
  await commonActions.clickButton(buttonName);
});

When('I click the {string} pencil button in the {string} section', async (orderText: string, sectionName: string) => {
  await commonActions.clickPencilButton({ sectionName, order: convertWordToNumber(orderText) });
});

When('I click the plus button in the {string} section', async (sectionName: string) => {
  await commonActions.clickPlusButton(sectionName);
});

Then('the {string} dialog appears', async (dialogName: string) => {
  await commonActions.checkDialogAppear(dialogName);
});

Then(
  'I can see the error message with content {string} under the {string} field',
  async (errorMessage: string, fieldName: string) => {
    await commonActions.checkErrorMessage(errorMessage, fieldName);
  },
);

Then('the {string} dialog disappears', async (dialogName: string) => {
  await commonActions.checkDisappear(dialogName);
});

When('I input {string} to the {string} field', async (inputValue: string, fieldName: string) => {
  await commonActions.inputText(fieldName, inputValue);
});

When('I click the tab {string}', async (tabName: string) => {
  await commonActions.clickTab(tabName);
});

When('I select the {string} item in the list', async (tabOrder: string) => {
  await commonActions.selectOption({ itemOrder: convertWordToNumber(tabOrder) });
});

When(
  'I input {string} and select {string} for the {string} field',
  async (fillValue: string, selectValue: string, fieldName: string) => {
    await commonActions.fillAndSelect({
      fillValue,
      selectValue,
      fieldName,
    });
  },
);

When('I click on the {string} dialog title', async (dialogName: string) => {
  await commonActions.clickDialogTitle(dialogName);
});

When('I click pencil to edit the {string} section', async (sectionName: string) => {
  await commonActions.clickEditSection(sectionName);
});
