const ppt = require('puppeteer');

const viewports = [
    { width: 390, height: 844 },  // iPhone 12
    { width: 820, height: 1180 }, // iPad Air
    { width: 1536, height: 960 }  // MacBook Pro 16"
];

(async () => {
    // oppening browser
    const browser = await ppt.launch({
        headless: false
    });

    const page = await browser.newPage();

    // going through viewports
    for (let i = 0; i < viewports.length; i++) {
        const vp = viewports[i];
        console.log({vp});
        await page.setViewport(vp);
        await page.goto('https://github.com/Duclearc');
        await page.screenshot({ path: `./screenshots/${i}.jpg`});
    }

    setTimeout(async () => {
        // closing browser
        await browser.close()
    }, 3000);
})()