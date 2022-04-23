[![Build Status](https://app.travis-ci.com/emilhein/puppeteer-cmp-clicker.svg?branch=main)](https://app.travis-ci.com/emilhein/puppeteer-cmp-clicker)

## What do i do

For now i only have one function

#### 1. clickCmp({page, customKnownIds = [], customKnownClasses = []})

This function takes a puppeteer page as an argument and tries its best to click a cmp if its there


## Get started
You need to have puppeteer or puppeteer-core install, but this package should work with your existing puppeteer setup

```js
const { clickCmp } = require("puppeteer-cmp-clicker");
const chromium = require('chrome-aws-lambda') // or normal puppeteer package

let   browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true, // chromium.headless,
    ignoreHTTPSErrors: true,
});

let page = await browser.newPage();

await page.goto('https://nytimes.com', { waitUntil: 'networkidle0' });

let res = await clickCmp({ page })

// Output
// The CMP of nytimes should be clicked

```
