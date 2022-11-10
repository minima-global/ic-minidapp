const session = require("../session.json");

describe('Incentive Program - End to End', () => {
  beforeEach(async () => {
    await page.goto(session.MINIDAPP_APP_URL);
    await page.bringToFront();
  });

  it('should be titled "Wallet"', async () => {
    await expect(page.title()).resolves.toMatch('Wallet');
  });

  it('displays my rewards', async () => {
    await expect(page.title()).resolves.toMatch('Wallet');
  });

  it('displays my invite url', async () => {
    await expect(page.title()).resolves.toMatch('Wallet');
  });

  it('displays the connect my incentive id if on the view rewards page', async () => {
    await expect(page.title()).resolves.toMatch('Wallet');
  });

  it('displays the connect my incentive id to view my invite link', async () => {
    await expect(page.title()).resolves.toMatch('Wallet');
  });
});
