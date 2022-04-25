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
};
exports.KNOWNCMPS = KNOWNCMPS;