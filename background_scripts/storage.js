// Send volume target to all tabs on extension startup
var volumeTarget = localStorage.getItem("volumeTarget");

if (volumeTarget === null) {
    localStorage.setItem("volumeTarget", "1");
    volumeTarget = 1;
} else {
    volumeTarget = parseFloat(volumeTarget);
}

browser.tabs.query({}).then((tabs) => {
    for (const tab of tabs) {
        browser.tabs.sendMessage(volumeTarget);
    }
});

// Send volume target when popup is opened, store volume target when changed in popup
browser.runtime.onMessage.addListener((newValues) => {
    if (newValues === "popupOpen") {
        browser.runtime.sendMessage({volumeTarget: parseFloat(localStorage.getItem("volumeTarget"))});
    } else if (newValues === "injected") {
        browser.tabs.query({}).then((tabs) => {
            for (const tab of tabs) {
                browser.tabs.sendMessage(tab.id, parseFloat(localStorage.getItem("volumeTarget")));
            }
        });
    } else {
        localStorage.setItem("volumeTarget", newValues["volumeTarget"]);
    }
});
