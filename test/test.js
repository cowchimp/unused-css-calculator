/* This test relies on https://unused-css-example-site-qijunirqpu.now.sh being available! */

const puppeteer = require('puppeteer');
const assert = require('assert');
const { calc } = require('../index');

describe('calc', function() {
  this.timeout(6000);

  it('calculates the percentage of unused CSS after interaction with the page successfully', async function () {
    const browser = await puppeteer.launch();

    const result = await calc(
      browser,
      async function(page) {
        const url = 'https://unused-css-example-site-qijunirqpu.now.sh';
        await page.goto(url);
        await page.click('.tab.type2');
        await page.click('.tab.type3');
        await page.click('.tab.type4');
      }
    );

    assert.equal(result, 15);

    await browser.close();
  });
});