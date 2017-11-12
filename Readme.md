![node](https://img.shields.io/node/v/unused-css-calculator.svg)

# unused-css-calculator

Calculates the percentage of unused CSS of a webpage after user interaction

## Motivation

Being able to monitor the percentage of unused CSS in a page over time is useful in order to make sure this percentage says low over time.  
Some other tools that provide this metric measure the amount of unused CSS right after the page loads, when a significant portion of CSS rules have not yet been applied, since the user has not interacted with the page yet.  
This tool calculates the amount of unused CSS after mimicking the user interacting with the page.  
For this to work you need to pass-in a callback function that describes how to simulate the user interacting with your page.

## Usage

* unused-css-calculator is used along with Google's [Puppeteer](https://github.com/GoogleChrome/puppeteer), a high-level API for controlling [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome).
* It requires Node.js 7.6 or greater because it relies on async\await.
* The `calc` function takes two parameters
  * A Puppeteer `browser` instance (the result of running `puppeteer.launch()`
  * A function describing how to simulate the user interacting with the page. Should return a promise.

```javascript
const puppeteer = require('puppeteer');
const { calc } = require('unused-css-calculator');

(async function() {
  const browser = await puppeteer.launch();

  const unusedCSS = await calc(
    browser,
    async function(page) {
      const url = 'https://unused-css-example-site-qijunirqpu.now.sh';
      await page.goto(url);
      await page.click('.tab.type2');
      await page.click('.tab.type3');
      await page.click('.tab.type4');
    }
  );

  console.log(`${unusedCSS}% of your CSS is unused`);

  await browser.close();
})();
```

## Running tests

Run tests with `npm test`

## License

MIT