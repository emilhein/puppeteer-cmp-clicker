
## What do i do

For now i only have one function

#### 1. cmpClickAndFinder({page, customKnownIds = [], customKnownClasses = [],})

This function takes a puppeteer browser as an augument
## basic usage

```js
const { cmpClickAndFinder } = require("puppeteer-cmp-clicker");
// const chromium = require('chrome-aws-lambda')


let cmpClicked = await cmpClickAndFinder({ page })

// Output
// Your CMP popup should have been clicked

```
