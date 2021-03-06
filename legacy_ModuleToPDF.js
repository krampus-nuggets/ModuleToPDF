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
const dir = "<dir>";
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

const pageEvaluation = async () => {
    await page.evaluate(() => {
        const removeElements = async () => {
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

            // START - Remove IDs
            footer.parentNode.removeChild(footer);
            // END

            // START - LOOP HELL
            for (var i = 0; i < videoElements.length; i++) {
                videoElements[i].parentNode.removeChild(videoElements[i]);
            }

            for (var i = 0; i < contentHeader.length; i++) {
                contentHeader[i].parentNode.removeChild(contentHeader[i]);
            }

            for (var i = 0; i < feedbackSection.length; i++) {
                feedbackSection[i].parentNode.removeChild(feedbackSection[i]);
            }

            for (var i = 0; i < navMain.length; i++) {
                navMain[i].parentNode.removeChild(navMain[i]);
            }

            for (var i = 0; i < navBasic.length; i++) {
                navBasic[i].parentNode.removeChild(navBasic[i]);
            }
            // END
        }
        removeElements();
    });
}

generatePDF();
