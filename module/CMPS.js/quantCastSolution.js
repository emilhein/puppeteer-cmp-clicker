"use strict";
const { KNOWNCMPS } = require("../helpers/KNOWNCMPS");
const { xPathSelector } = require("../helpers/utils");

const quantCastSolution = async (page) => {
    try {
        let selector = '//*[@id="qc-cmp2-ui"]/div[2]/div/button[2]';
        let found = await xPathSelector(page, selector);
        return found ? KNOWNCMPS.quantcast : false;
    } catch (error) {
        console.log(KNOWNCMPS.quantcast, error);
        return false;
    }
};
exports.quantCastSolution = quantCastSolution;