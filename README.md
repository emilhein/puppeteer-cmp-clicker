[![Build Status](https://app.travis-ci.com/emilhein/puppeteer-cmp-clicker.svg?branch=main)](https://app.travis-ci.com/emilhein/puppeteer-cmp-clicker)

## What do i do

For now i only have one function

#### 1. cmpClickAndFinder({page, customKnownIds = [], customKnownClasses = [],})

This function takes a puppeteer page as an argument and tries its best to click a cmp if its there


## Get started
```js
const { cmpClickAndFinder } = require("puppeteer-cmp-clicker");
// const chromium = require('chrome-aws-lambda') // or normal puppeteer package


let cmpClicked = await cmpClickAndFinder({ page })

// Output
// Your CMP popup should have been clicked

```
