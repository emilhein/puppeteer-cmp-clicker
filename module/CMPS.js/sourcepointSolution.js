"use strict";
const { CLICKTEXTS } = require("../helpers/CLICKTEXTS");
const { KNOWNCMPS } = require("../helpers/KNOWNCMPS");
const { clickPromise } = require("../helpers/utils");

const sourcepointSolution = async (page) => {
    try {
        const frames = await page.frames();
        let clickPromises = [];
        const frame = frames.find(f => {
            return f.url().includes('https://cdn.privacy-mgmt.com') || f.name().includes('sp_message_iframe');
        });
        if (frame) {
            CLICKTEXTS.forEach(async (text) => {
                let exp = `//button[contains(., '${text}')]`;
                clickPromises.push(clickPromise(frame, exp));
            });
        }
        let res = await Promise.all(clickPromises);
        let found = res.filter(e => Boolean(e)).length > 0;
        return found ? KNOWNCMPS.sourcepoint : false;
    } catch (error) {
        return false;
    }
};
exports.sourcepointSolution = sourcepointSolution;