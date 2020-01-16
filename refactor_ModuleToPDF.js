// START - Imports
const puppeteer = require("puppeteer");
const uuid = require("uuid");
const cookies = require("C:/projects/krampus-nuggets/ModuleToPDF/cookies.json");
// END

// START - GLOBALS
const URL = "https://docs.microsoft.com/en-us/learn/modules/principles-cloud-computing/1-introduction";
const units = 10;
// END

// START - generatePDF [GLOBALS]
var browser;
var page;
const dir = "C:/Users/brandon/Desktop/test/";
let filename = `${ uuid.v1() }`;

const pdfConfig = {
    path: `${ dir + filename + ".pdf" }`,
    height: "842px",
    width: "785px",
    printBackground: true
}
// END

// START - removeElements [GLOBALS]
let videoElements;
let navBasic;
let navMain;
let contentHeader;
let feedbackSection;
let footer;
//const continueButton = "p > a.button";
// END

const generatePDF = async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    //await browser.setCookies(cookies);
    await page.goto(URL);

    for (var i = 0; i < units;) {
        await pageEvaluation(page);
        await page.pdf(pdfConfig);
        if (i != units - 1) {
            await Promise.all([page.click("a#next-unit-link"), await page.waitForNavigation()]);
        }
        i++;
    }
    browser.close();
}

            // START - Classes
            videoElements = document.querySelectorAll(".embeddedvideo");
            contentHeader = document.querySelectorAll("content-header");
            feedbackSection = document.querySelectorAll(".feedback-section");
            navMain = document.querySelectorAll(".nav-main");
            navBasic = document.querySelectorAll(".nav-basic");
            // END

            // START - IDs
            footer = document.querySelector("#footer");
            // END

