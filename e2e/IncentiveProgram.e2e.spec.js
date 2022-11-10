require('dotenv').config({ path: '../.env' });
const session = require("../session.json");
const helpers = require("./helpers");
const axios = require("axios");

describe('Incentive Program - End to End', () => {
  beforeEach(async () => {
    await page.goto(session.MINIDAPP_APP_URL);
    await page.bringToFront();
    await axios.get(session.MINIMA_RPC_URL + '/incentivecash uid:""');
  });

  it('should be titled "Incentive Program"', async () => {
    await expect(page.title()).resolves.toMatch('Incentive Program');
  });

  it('displays an success message if a valid uid was entered', async () => {
    await page.type(helpers.getByTestId('UIDForm__inputUid', { input: true }), String(process.env.E2E_INCENTIVE_CASH_UID));
    await page.click(helpers.getByTestId('UIDForm__btnSubmit'));
    await page.waitForSelector(helpers.getByTestId('UIDForm__responseMessage'));
    const textContent = await helpers.getTextContent(page, helpers.getByTestId('UIDForm__responseMessage'));
    const className = await helpers.getClassName(page, helpers.getByTestId('UIDForm__responseMessage'));

    await expect(className).not.toEqual(expect.stringContaining('error'));
    await expect(textContent).toEqual('You have successfully registered your node.');
    await page.screenshot({ path: '../screenshots/register_uid_successful.png' });
  });

  it('displays an error message if an invalid uid was entered', async () => {
    await page.type(helpers.getByTestId('UIDForm__inputUid', { input: true }), 'invalid-uid');
    await page.click(helpers.getByTestId('UIDForm__btnSubmit'));
    await page.waitForSelector(helpers.getByTestId('UIDForm__responseMessage'));
    const textContent = await helpers.getTextContent(page, helpers.getByTestId('UIDForm__responseMessage'));
    const className = await helpers.getClassName(page, helpers.getByTestId('UIDForm__responseMessage'));

    await expect(className).toEqual(expect.stringContaining('error'));
    await expect(textContent).toEqual('You have entered an invalid Incentive ID, please go to the Incentive Website & copy it from the Incentive ID page.');
    await page.screenshot({ path: '../screenshots/register_uid_unsuccessful.png' });
  });

  it('displays my rewards', async () => {
    await page.type(helpers.getByTestId('UIDForm__inputUid', { input: true }), String(process.env.E2E_INCENTIVE_CASH_UID));
    await page.click(helpers.getByTestId('UIDForm__btnSubmit'));
    await page.waitForSelector(helpers.getByTestId('UIDForm__responseMessage'));
    await page.click(helpers.getByTestId('DrawerContent__detailsLink'));

    await expect(page.$(helpers.getByTestId('InviteLink__rewardDetails'))).resolves.toBeTruthy();
    await page.screenshot({ path: '../screenshots/rewards_available.png' });
  });

  it('displays my invite url', async () => {
    await page.type(helpers.getByTestId('UIDForm__inputUid', { input: true }), String(process.env.E2E_INCENTIVE_CASH_UID));
    await page.click(helpers.getByTestId('UIDForm__btnSubmit'));
    await page.waitForSelector(helpers.getByTestId('UIDForm__responseMessage'));
    await page.click(helpers.getByTestId('DrawerContent__detailsLink'));

    await page.click(helpers.getByTestId('DrawerContent__inviteLink'));
    await expect(page.$(helpers.getByTestId('InviteLink__availableLink'))).resolves.toBeTruthy();
    await page.screenshot({ path: '../screenshots/invite_link_available.png' });
  });

  it('displays the connect my incentive id if on the view rewards page', async () => {
    await page.click(helpers.getByTestId('DrawerContent__detailsLink'));
    await expect(page.$(helpers.getByTestId('InviteLink__rewardDetailsNotAvailable'))).resolves.toBeTruthy();
    await page.screenshot({ path: '../screenshots/rewards_not_available.png' });
  });

  it('displays the connect my incentive id to view my invite link', async () => {
    await page.click(helpers.getByTestId('DrawerContent__inviteLink'));
    await expect(page.$(helpers.getByTestId('InviteLink__unavailableLink'))).resolves.toBeTruthy();
    await page.screenshot({ path: '../screenshots/invite_link_not_available.png' });
  });
});
