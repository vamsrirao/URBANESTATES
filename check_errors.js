import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

    await page.goto('http://localhost:5174/dashboard/buyer', { waitUntil: 'networkidle0' }).catch(e => console.log('GOTO ERROR:', e.message));
    
    console.log('Page loaded. Capturing DOM...');
    const html = await page.evaluate(() => document.body.innerHTML);
    console.log('Body length:', html.length);
    
    await browser.close();
})();
