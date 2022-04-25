"use strict";
const { KNOWNCMPS } = require("../helpers/KNOWNCMPS");

const fundingChoiceSolution = async (page) => {
    try {
        let found = false;
        found = await page.evaluate(() => {
            let btn = document.querySelectorAll('.fc-cta-consent')[0];
            if (btn) {
                btn.click();
                return true;
            }
            return false;
        });
        return found ? KNOWNCMPS.fundingChoice : false;
    } catch (error) {
        console.log(KNOWNCMPS.fundingChoice, error);
        return false;
    }
};
exports.fundingChoiceSolution = fundingChoiceSolution;