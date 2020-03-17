/*
    Yes, console.clear() exists but it still leaves a buffer (scrollable)
    and I don't like that so suck it ༼ つ ◕_◕ ༽つ
*/

// START [OS Check]
const checkSystem = () => {
    let OS;

    if (process.platform == "win32") {
        OS = "windows";
    }
    else if (process.platform == "linux" || process.platform == "freebsd" || process.platform == "openbsd") {
        OS = "linux";
    }
    else if (process.platform == "darwin") {
        OS = "darwin";
    } else {
        OS = process.platform;
        /* ¯\_(ツ)_/¯ */
    }

    return OS;
}
// END [OS Check]

// START [Terminal & Buffer Clear]
const clear = () => {
    process.stdout.write("\u001B[2J\u001B[0;0f");
};
// END [Terminal & Buffer Clear]

module.exports = { checkSystem, clear };