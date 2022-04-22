"use strict";
// https://stackoverflow.com/questions/59618456/pupeteer-how-can-i-accept-cookie-consent-prompts-automatically-for-any-url
const KNOWNCMPS = {
    quantcast: 'QUANTCAST',
    fundingChoice: 'FUNDING CHOICE (GOOGLE)',
    cookiebot: 'COOKIEBOT',
    onetrust: 'ONETRUST',
    sourcepoint: 'SOURCEPOINT',
    cookieInformation: 'COOKIEINFORMATION',
    knownClass: 'KNOWN CLASS',
    knownID: 'KNOWN ID',
}
const CLICKTEXTS = [
    'Tillad Alle',
    'ok',
    'Accepter',
    'godkend',
    'acceptér',
    'accept',
    'accept all',
    'Giv samtykke',
    'Accepter alle',
    'Acceptér alle',
    'Accepter alle cookies',
    'Det er fint med mig',
    'Ja tak, tillad alle',
    'Alle akzeptieren',
    'Akzeptieren',
    'Verstanden',
    'Zustimmen',
    'Okay',
    'OK',
]
const GLOBALKNOWNACCEPTCLASSES = [
    'css-aovwtd' // nytimes.com
]
const GLOBALKNOWNACCEPIDS = []
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
const xPathSelector = async (page, xpath) => {
    let found = false
    const elements = await page.$x(xpath)
    if (!elements) return false
    if (elements && elements.length > 0) {
        let proms = []
        elements.forEach(ele => {
            proms.push(ele.click())
        })
        await Promise.all(proms)
        found = true
    }
    return found
}
const quantCastSolution = async page => {
    try {
        let selector = '//*[@id="qc-cmp2-ui"]/div[2]/div/button[2]'
        let found = await xPathSelector(page, selector)
        return found ? KNOWNCMPS.quantcast : false
    } catch (error) {
        console.log(KNOWNCMPS.quantcast, error);
        return false
    }
}
const fundingChoiceSolution = async page => {
    try {
        let found = false
        found = await page.evaluate(() => {
            let btn = document.querySelectorAll('.fc-cta-consent')[0]
            if (btn) {
                btn.click();
                return true
            }
            return false
        });
        return found ? KNOWNCMPS.fundingChoice : false
    } catch (error) {
        console.log(KNOWNCMPS.fundingChoice, error);
        return false
    }
}
const cookiebotSolution = async page => {
    try {
        let found = false
        let overallSelector = 'CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'
        found = await page.evaluate(() => {
            let overallSelector = 'CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'
            let btn = document.querySelectorAll(`#${overallSelector}`)[0]
            if (btn) {
                btn.click();
                return true
            }
            return false
        });
        if (!found) {
            let selector = `//*[@id="${overallSelector}"]`
            found = await xPathSelector(page, selector)
        }
        return found ? KNOWNCMPS.cookiebot : false
    } catch (error) {
        console.log(KNOWNCMPS.cookiebot, error);
        return false
    }
}
const onetrustSolution = async page => {
    try {
        // This works for ONETRUST xpath
        let selector = '//*[@id="onetrust-accept-btn-handler"]'
        let found = await xPathSelector(page, selector)
        return found ? KNOWNCMPS.onetrust : false
    } catch (error) {
        return false
    }
}
const clickPromise = async (frame, exp) => {
    const [button] = await frame.$x(exp);
    if (button) {
        await button.click();
        return true
    }
    return false
}
const sourcepointSolution = async page => {
    try {
        const frames = await page.frames();
        let clickPromises = []
        const frame = frames.find(f => {
            return f.url().includes('https://cdn.privacy-mgmt.com') || f.name().includes('sp_message_iframe')
        })
        if (frame) {
            CLICKTEXTS.forEach(async text => {
                let exp = `//button[contains(., '${text}')]`
                clickPromises.push(clickPromise(frame, exp))
            })
        }
        let res = await Promise.all(clickPromises)
        let found = res.filter(e => Boolean(e)).length > 0
        return found ? KNOWNCMPS.sourcepoint : false
    } catch (error) {
        return false
    }
}
const cookieInformationSolution = async page => {
    try {
        return page.evaluate((KNOWNCMPS) => {
            if (window.CookieInformation && window.CookieInformation.submitAllCategories) {
                window.CookieInformation.submitAllCategories()
                return KNOWNCMPS.cookieInformation
            } else {
                return (false)
            }
        }, KNOWNCMPS)
    } catch (error) {
        return false
    }
}
let cmpClickAndFinder = async ({
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
module.exports = { cmpClickAndFinder }