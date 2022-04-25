"use strict";
const { KNOWNCMPS } = require("../helpers/KNOWNCMPS");
const { xPathSelector } = require("../helpers/utils");

const cookiebotSolution = async (page) => {
    try {
        let found = false;
        let overallSelector = 'CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll';
        found = await page.evaluate(() => {
            let overallSelector = 'CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll';
            let btn = document.querySelectorAll(`#${overallSelector}`)[0];
            if (btn) {
                btn.click();
                return true;
            }
            return false;
        });
        if (!found) {
            let selector = `//*[@id="${overallSelector}"]`;
            found = await xPathSelector(page, selector);
        }
        return found ? KNOWNCMPS.cookiebot : false;
    } catch (error) {
        console.log(KNOWNCMPS.cookiebot, error);
        return false;
    }
};
exports.cookiebotSolution = cookiebotSolution;