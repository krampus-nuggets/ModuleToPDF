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

