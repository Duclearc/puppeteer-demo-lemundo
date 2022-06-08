const ppt = require('puppeteer');
const { imageType, screenshotsPath, targetUrl, viewports } = require('./config.json');

/** Returns the current date formatted as `YYYY.MM.DD-HH:mm:ss` */
function getCurrentFormattedDate() {
    const today = new Date();
    const date = today.toISOString().split('T')[0].replace(/-/g,'.'); // YYYY.MM.DD
    const time = today.toLocaleTimeString(); // HH:mm:ss
    return `${date}-${time}`;
}

(async () => {
    // oppening browser
    const browser = await ppt.launch({
        headless: false
    });

    const page = await browser.newPage();

    // going through viewports
    for (let i = 0; i < viewports.length; i++) {
        const vp = viewports[i];
        await page.setViewport(vp);
        await page.goto(targetUrl);

        const website = (
            page.url()
            .match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/igm)[0]
            .replace(/(^\w+:|^)\/\//, '')
        ); // domain.com

        await page.screenshot({ path: `${screenshotsPath}/${getCurrentFormattedDate()}_${website}_${vp.device}.${imageType}` });
    }

    // closing browser
    await browser.close();
})()