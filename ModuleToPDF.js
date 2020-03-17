/*
Author - @krampus-nuggets
Profile - https://github.com/krampus-nuggets
Repository - https://github.com/krampus-nuggets/ModuleToPDF

 =======
| TO-DO |
 =======

1. Convert script to CLI
2. Get the merged PDF's name during scrape [Module Name]
3. Rollback Feature - Clear generated files from system if error encountered
4. Add error-handling
*/

// START [Imports]
const puppeteer = require("puppeteer");
const merge = require("easy-pdf-merge");
const fs = require("fs");
const inquirer = require("inquirer");
const { performance } = require("perf_hooks");
const { consoleOutput } = require("./modules/banners");
// END [Imports]

// START [Globals]
const moduleURL = "https://docs.microsoft.com/en-gb/learn/modules/create-serverless-logic-with-azure-functions/1-introduction"; // Remove Static - Module URL
const outputFile = __dirname + "/merged/create-serverless-logic-with-azure-functions.pdf"; // Remove Static - File Name
let pageEvaluation, unitURLs, unitList, unitJSON, browser, page;
let directory = __dirname + "/exports/";
let configs = [];
let fileArray = [];
let f = 0;
// END [Globals]

// START [Config Generator]
const configGenerator = async () => {
    await page.waitFor(1);
    for (var i = 0; i < pageEvaluation.length; i++) {
        var x = i + 1;
        let filename = `${ x }_unit.pdf`;
        let fileconfig = {
            path: `${ directory + filename }`,
            format: "A4",
            printBackground: true,
            margin: {
                top: "10px",
                right: "0px",
                bottom: "10px",
                left: "0px"
        }
        }
        configs.push(fileconfig);
    }
    //await page.waitFor(2);
}
// END [Config Generator]

// START [PDF Generator]
const pdfGenerator = async (value) => {
    await page.goto(pageEvaluation[value]);
    await page.waitForSelector("ul.has-margin-none.is-size-7.has-text-subtle.is-unstyled>li>a");
    await page.pdf(configs[value]);
}
// END [PDF Generator]

// START [PDF Merge]
function mergePDF() {
    console.log("Merge Proc [STARTED]\n");
    // START [Synchronous Dir Read]
    fs.readdirSync(directory).forEach(file => {
        fileArray.push(directory + file);
        console.log(`${ fileArray[f] } => File pushed to array!`);
        f++;
    });
    f = 0;
    // END [Synchronous Dir Read]

    merge(fileArray, outputFile, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(consoleOutput("mergeHeaders", 1));
        console.log(`Merged Here => ${ outputFile }`);
        process.exit(0);
    });
};
// END [PDF Merge]

// START [Get Unit URLs] - MAIN FUNCTIONALITY
const getUnits = async () => {
    var timeStart = performance.now();

    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(moduleURL);

    pageEvaluation = await page.evaluate(() => {
        unitURLs = [];
        unitJSON = {};
        unitList = document.querySelectorAll("ul.has-margin-none.is-size-7.has-text-subtle.is-unstyled>li>a");
        for (var i = 0; i < unitList.length; i++) {
            unitJSON = unitList[i].href;
            unitURLs.push(unitJSON);
        }
        return unitURLs;
    });

    await configGenerator();

    for (var i = 0; i < pageEvaluation.length; i++) {
        await pdfGenerator(i);
        console.log(`PDF Created => ${ i }`);
    }

    await browser.close();

    // START [Merge PDFs]
    console.log(consoleOutput("mergeHeaders", 0));
    mergePDF();
    // END [Merge PDFs]

    var timeStop = performance.now();
    console.log("Run Duration = " + (timeStop - timeStart));
};
// END [Get Unit URLs] - MAIN FUNCTIONALITY

})();
// END [Get Unit URLs]