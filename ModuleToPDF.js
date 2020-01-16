// START - Imports
const puppeteer = require("puppeteer");
const uuid = require("uuid");
// END

/*
------------------------------------
TASKS |
------
1. Debug removeElm()
    - parentNode -> returns null value
    - Acquire noise profile of catch(e) value
    - Also check Classes and IDs as specified format in pdfConfig
2. Automate filename assignment
    - variable = querySelect(<unit-heading>).innerText
    - write value to variable -> assign as filename
------------------------------------
*/

let generatePDF = async () => {
    // START - Puppeteer config
    const browser = await puppeteer.launch({ headless: true });
    const newTab = await browser.newPage();
    await newTab.goto(URL, { waitUntil: "networkidle0" });
    // END

    // START - MS Learn config
    //let index = [];
    //console.log(`Index: ${ index.length }`); // CHECK - Pagination FOR LOOP write to Array
    let units = 10;
    // END

    // START - Pagination Handler
    for (let i = 0; i < units; i++) {
        //await newTab.waitFor(10000);
        proc = await pageEval(newTab);
        if (i != units - 1) {
            await newTab.click("p > a.button");
        }
    }
    // END

    // START - Complete process
    browser.close();
    // END
};

async function pageEval(newTab) {
    await newTab.evaluate(() => {
        const removeElm = () => {
            let vidElm = document.querySelectorAll(".embeddedvideo");
            const contentHead = document.querySelector(".content-header");
            let navMain = document.querySelector(".nav-main");
            let navBasic = document.querySelector(".nav-basic");
            let footer = document.querySelector("#footer");

            try {
                footer.parentNode.removeChild(footer);
                
                navMain.parentNode.removeChild(navMain);

                navBasic.parentNode.removeChild(navBasic);

                contentHead.parentNode.removeChild(contentHead);
                
                // FOR LOOP
                for (var i = 0; i < vidElm.length; i++) {
                    vidElm[i].parentNode.removeChild(vidElm[i]);
                }
                /*
                // FOR LOOP 
                for (var i = 0; i < contentHead.length; i++) {
                    contentHead[i].parentNode.removeChild(contentHead[i]);
                }*/
            } catch(e) {
                console.log(e);
            }
        }
        removeElm();
    });
    // START - Filename & Output Directory
    let dir = "C:/Users/brandon/Desktop/test/";
    let filename = `${ uuid.v1() }`;
    // END

    // START - PDF config
    const pdfConfig = {
        path: `${ dir + filename + ".pdf" }`,
        format: "A4",
        printBackground: true,
        margin: {
            top: "38px",
            right: "38px",
            bottom: "38px",
            left: "38px"
        }
    };
    // END

    await newTab.emulateMedia("screen");
    const PDF = await newTab.pdf(pdfConfig);
    return PDF;
};

let URL = "https://docs.microsoft.com/en-us/learn/modules/principles-cloud-computing/1-introduction";
generatePDF(URL);
