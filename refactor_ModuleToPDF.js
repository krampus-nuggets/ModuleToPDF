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

