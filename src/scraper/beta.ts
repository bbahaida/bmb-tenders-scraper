import * as cheerio from "cheerio";
import puppeteer from 'puppeteer';

async function scrapeWebsite() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://www.beta-conseils.com/appels-offres', { waitUntil: 'networkidle2' });

    const content = await page.content();
    const $ = cheerio.load(content);
    
    $('div.job-list-item').each((_, element) => {
        const source = "beta.mr";
        const title = $(element).find("a.job-title.hover-blue").text().trim();
        const company = $(element).find("a.text-success.d-inline-block.mt-1").text().trim();
        const link = $(element).find("a.job-title.hover-blue").attr('href');
        const deadline = $(element).find("a.text-danger-2").text().trim();

        console.log({ source, title, company, link, deadline });
        // Here you can save the data to the database or trigger an email notification
    });

    await browser.close();
}

scrapeWebsite();
