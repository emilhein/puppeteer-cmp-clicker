"use strict";
const chromium = require('chrome-aws-lambda');

const assert = require("assert");
const { clickCmp } = require("./../module/puppeteer-cmp-clicker");


describe("The module test suite", function() {
    it("A Happy path for the clickCmp function", async () => {

        let browser = null;

        try {
            browser = await chromium.puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath,
                headless: true, // chromium.headless,
                ignoreHTTPSErrors: true,
            });

            let page = await browser.newPage();

            await page.goto('https://nytimes.com', { waitUntil: 'networkidle0' });

            let res = await clickCmp({ page })

            assert.deepEqual(res[0], 'KNOWN CLASS');
            return
        } catch (error) {
            await browser.close();

            console.log(`Overall test error: ${error}`);
        } finally {
            if (browser !== null) {
                await browser.close();
            }
            return
        }


    });

    // it("A UNHAPPY path for the clickCmp function", async () => {

    // });


});