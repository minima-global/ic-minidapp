async function getClassName(page, testId) {
  const el = await page.$(testId);
  return await page.evaluate(el => el.className, el);
}

module.exports = getClassName;
