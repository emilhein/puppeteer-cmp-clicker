"use strict";
const { KNOWNCMPS } = require("../helpers/KNOWNCMPS");

const cookieInformationSolution = async (page) => {
    try {
        return page.evaluate((KNOWNCMPS) => {
            if (window.CookieInformation && window.CookieInformation.submitAllCategories) {
                window.CookieInformation.submitAllCategories();
                return KNOWNCMPS.cookieInformation;
            } else {
                return (false);
            }
        }, KNOWNCMPS);
    } catch (error) {
        return false;
    }
};
exports.cookieInformationSolution = cookieInformationSolution;