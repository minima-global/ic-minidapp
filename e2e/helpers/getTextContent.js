async function getTextContent(page, testId) {
  const el = await page.$(testId);
  return await page.evaluate(el => el.textContent, el);
}

module.exports = getTextContent;
