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
const { performance: perf } = require("perf_hooks");
const { consoleOutput } = require("./modules/banners");
// END [Imports]

// START [Globals]
const moduleURL = "https://docs.microsoft.com/en-gb/learn/modules/create-serverless-logic-with-azure-functions"; // Remove Static - Module URL
const filenameURL = moduleURL.split('/');
const outputFile = __dirname + `/merged/${filenameURL[filenameURL.length - 1]}.pdf`; // Remove Static - File Name

let pageEvaluation, unitURLs, unitList, unitJSON, browser, page;
let exportDirectory = __dirname + "/exports/";
let configs = [];
let fileArray = [];
let f = 0;
// END [Globals]

// START [Config Generator]
const configGenerator = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await page.waitFor(1);

            for (var i = 0; i < pageEvaluation.length; i++) {
                let filename = `${i++}_unit.pdf`;

                let fileconfig = {
                    path: `${exportDirectory + filename}`,
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

            resolve();
        } catch (err) {
            reject();
        }
    })
}
// END [Config Generator]

// START [PDF Generator]
const pdfGenerator = async (value) => {
    await page.goto(pageEvaluation[value]);

    await page.waitForSelector("div#unit-inner-section>h1");

    await page.pdf(configs[value]);
}
// END [PDF Generator]

// START [PDF Merge]
function mergePDF() {
    console.log("Merge Proc [STARTED]\n");

    // START [Synchronous Dir Read]
    fs.readdirSync(exportDirectory).forEach(file => {
        fileArray.push(exportDirectory + file);
        console.log(`${fileArray[f]} => File pushed to array!`);
        f++;
    });
    f = 0;
    // END [Synchronous Dir Read]

    merge(fileArray, outputFile, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log(consoleOutput("mergeHeaders", 1));
        console.log(`Merged Here => ${outputFile}`);
        process.exit(0);
    });
};
// END [PDF Merge]

// START [Get Unit URLs] - MAIN FUNCTIONALITY
const getUnits = async () => {
    var timeStart = perf.now();

    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(moduleURL);

    pageEvaluation = await page.evaluate(() => {
        unitURLs = [];
        unitJSON = {};
        unitList = document.querySelectorAll("ul#unit-list>li>div>div>a");

        for (var i = 0; i < unitList.length; i++) {
            unitJSON = unitList[i].href;
            unitURLs.push(unitJSON);
        }

        return unitURLs;
    });

    await configGenerator();

    for (var i = 0; i < pageEvaluation.length; i++) {
        await pdfGenerator(i);
        console.log(`PDF Created => ${i}`);
    }

    await browser.close();

    // START [Merge PDFs]
    console.log(consoleOutput("mergeHeaders", 0));
    mergePDF();
    // END [Merge PDFs]

    var timeStop = perf.now();
    console.log("Run Duration = " + (timeStop - timeStart));
};
// END [Get Unit URLs] - MAIN FUNCTIONALITY

// START [User-Interface]
const modules = [
    "Create Serverless Logic with Azure Functions [Dev Associate Cert]",
    "That's the only one for now ಠ_ಠ"
];

const interfaceLogic = () => {
    const initQ = [{
        type: "list",
        name: "initialQuestion",
        message: "Would you like to convert a Microsoft Learn Module to a PDF?",
        choices: ["Yes", "No"]
    }];

    const moduleQ = [{
        type: "list",
        name: "whichModule",
        message: "Which module would you like to convert?",
        choices: modules
    }];

    console.log(consoleOutput("mainHeader"));

    inquirer.prompt(initQ).then(answer => {
        if (answer.initialQuestion == "Yes") {
            inquirer.prompt(moduleQ).then(answer => {
                if (answer.whichModule == `${modules[0]}`) {
                    getUnits();
                } else {
                    console.log("Fight Me (ง •̀_•́)ง");
                    interfaceLogic();
                }
            });
        } else {
            console.log("Congrats, you've just wasted time ¯\\_(⊙_ʖ⊙)_/¯");
            process.exit(0);
        }
    });
};

interfaceLogic();
// END [User-Interface]
