"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const puppeteer_1 = __importDefault(require("puppeteer"));
async function scrapeWebsite() {
    const browser = await puppeteer_1.default.launch({
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
//# sourceMappingURL=beta.js.map