"use strict";

const { GLOBALKNOWNACCEPTCLASSES } = require("./helpers/GLOBALKNOWNACCEPTCLASSES");
const { KNOWNCMPS } = require("./helpers/KNOWNCMPS");
const { GLOBALKNOWNACCEPIDS } = require("./helpers/GLOBALKNOWNACCEPIDS");
const { cookiebotSolution } = require("./CMPS.js/cookiebotSolution");
const { onetrustSolution } = require("./CMPS.js/onetrustSolution");
const { sourcepointSolution } = require("./CMPS.js/sourcepointSolution");
const { cookieInformationSolution } = require("./CMPS.js/cookieInformationSolution");
const { fundingChoiceSolution } = require("./CMPS.js/fundingChoiceSolution");
const { quantCastSolution } = require("./CMPS.js/quantCastSolution");

// const GLOBALKNOWNDATAATTRIBUTES = [
//     'data-testid' // nytimes.com
// ]
const clickOnKnownIds = async ({ page, knownIds }) => {
    try {
        let found = false
        found = await page.evaluate((IDLIST) => {
            let internalFound = false
            IDLIST.forEach(className => {
                let btn = document.getElementById(className)
                if (btn) {
                    btn.click();
                    internalFound = true
                }
            })
            return internalFound
        }, knownIds);
        return found ? KNOWNCMPS.knownID : false
    } catch (error) {
        console.log(KNOWNCMPS.knownID, error);
        return false
    }
}
const clickOnKnownClass = async ({ page, knownClasses }) => {
    try {
        let found = false
        found = await page.evaluate((knownClasses) => {
            let internalFound = false
            knownClasses.forEach(className => {
                let btn = document.getElementsByClassName(className)[0]
                if (btn) {
                    btn.click();
                    internalFound = true
                }
            })
            return internalFound
        }, knownClasses);
        return found ? KNOWNCMPS.knownClass : false
    } catch (error) {
        console.log(KNOWNCMPS.knownClass, error);
        return false
    }
}
let clickCmp = async ({
    page,
    customKnownIds = [],
    customKnownClasses = [],
    waitForCMP = 1000
}) => {
    let allKnownClasses = [...GLOBALKNOWNACCEPTCLASSES, ...customKnownClasses]
    let allKnownIds = [...GLOBALKNOWNACCEPIDS, ...customKnownIds]
    let foundCMP = await Promise.all([
        cookiebotSolution(page),
        sourcepointSolution(page),
        cookieInformationSolution(page),
        quantCastSolution(page),
        clickOnKnownIds({ page, knownIds: allKnownIds }),
        clickOnKnownClass({ page, knownClasses: allKnownClasses }),
        onetrustSolution(page),
        fundingChoiceSolution(page),
    ])
    return foundCMP.filter(e => Boolean(e))
}
module.exports = { clickCmp }