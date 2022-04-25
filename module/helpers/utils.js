"use strict";
const xPathSelector = async (page, xpath) => {
    let found = false;
    const elements = await page.$x(xpath);
    if (!elements)
        return false;
    if (elements && elements.length > 0) {
        let proms = [];
        elements.forEach(ele => {
            proms.push(ele.click());
        });
        await Promise.all(proms);
        found = true;
    }
    return found;
};
const clickPromise = async (frame, exp) => {
    const [button] = await frame.$x(exp);
    if (button) {
        await button.click();
        return true;
    }
    return false;
};
module.exports = { clickPromise, xPathSelector }