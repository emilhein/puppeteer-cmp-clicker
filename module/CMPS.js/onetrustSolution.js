"use strict";
const { KNOWNCMPS } = require("../helpers/KNOWNCMPS");
const { xPathSelector } = require("../helpers/utils");

const onetrustSolution = async (page) => {
    try {
        // This works for ONETRUST xpath
        let selector = '//*[@id="onetrust-accept-btn-handler"]';
        let found = await xPathSelector(page, selector);
        return found ? KNOWNCMPS.onetrust : false;
    } catch (error) {
        return false;
    }
};
exports.onetrustSolution = onetrustSolution;