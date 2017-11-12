exports.calc = async function(browser, interactionCallback) {
  const page = await browser.newPage();

  const client = page._client;
  await client.send('Page.enable');
  await client.send('DOM.enable');
  await client.send('CSS.enable');

  await client.send('CSS.startRuleUsageTracking');

  const stylesheets = [];
    client.on('CSS.styleSheetAdded', stylesheet => {
      stylesheets.push(stylesheet.header);
  });

  await interactionCallback(page);

  const { ruleUsage } = await client.send('CSS.stopRuleUsageTracking');

  return calcUnusedCssPercentage(stylesheets, ruleUsage);
};

function calcUnusedCssPercentage(stylesheets, ruleUsage) {
  let usedLength = 0, totalLength = 0;
  stylesheets.forEach(function(stylesheet) {
    totalLength += stylesheet.length;
    usedLength += calcUsedLength(ruleUsage, stylesheet);
  });

  return 100 - Math.round(usedLength / totalLength * 100);
}

function calcUsedLength(ruleUsage, stylesheet) {
  const stylesheetRuleUsages = ruleUsage.filter(y => y.styleSheetId === stylesheet.styleSheetId);

  return stylesheetRuleUsages.reduce((sum, x) => sum + x.endOffset - x.startOffset, 0);
}
