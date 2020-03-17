// START [Console Output]
const consoleOutput = (container, value) => {
    let header;

    if (container == "mainHeader") {
        clear();
        header = mainHeader;
    }
    else if (container == "mergeHeaders") {
        clear();
        header = mergeHeaders[value];
    }

    return header;
}
// END [Console Output]

const mainHeader = `

/ $$      /$$                 /$$           /$$                /$$$$$$$$                /$$$$$$$  /$$$$$$$  /$$$$$$$$
| $$$    /$$$                | $$          | $$               |__  $$__/               | $$__  $$| $$__  $$| $$_____/
| $$$$  /$$$$  /$$$$$$   /$$$$$$$ /$$   /$$| $$  /$$$$$$         | $$  /$$$$$$         | $$  \\ $$| $$  \\ $$| $$      
| $$ $$/$$ $$ /$$__  $$ /$$__  $$| $$  | $$| $$ /$$__  $$ /$$$$$$| $$ /$$__  $$ /$$$$$$| $$$$$$$/| $$  | $$| $$$$$   
| $$  $$$| $$| $$  \\ $$| $$  | $$| $$  | $$| $$| $$$$$$$$|______/| $$| $$  \\ $$|______/| $$____/ | $$  | $$| $$__/   
| $$\\  $ | $$| $$  | $$| $$  | $$| $$  | $$| $$| $$_____/        | $$| $$  | $$        | $$      | $$  | $$| $$      
| $$ \\/  | $$|  $$$$$$/|  $$$$$$$|  $$$$$$/| $$|  $$$$$$$        | $$|  $$$$$$/        | $$      | $$$$$$$/| $$      
|__/     |__/ \\______/  \\_______/ \\______/ |__/ \\_______/        |__/ \\______/         |__/      |_______/ |__/      

Author: @krampus-nuggets
Description: Microsoft Learn - Module to PDF Converter
\n
`;

const mergeHeaders = [
`
 =====================
| STARTED: Merge PDFs |
 =====================
\n
 `,
`
 =======================
| COMPLETED: Merge PDFs |
 =======================
\n
`
];
