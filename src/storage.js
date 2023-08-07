// Send volume target to all tabs on extension startup
var volumeTarget = localStorage.getItem("volumeTarget");

if (volumeTarget === null) {
    localStorage.setItem("volumeTarget", "20");
    volumeTarget = 20;
} else {
    volumeTarget = parseInt(volumeTarget);
}

browser.tabs.query({}).then((tabs) => {
    for (const tab of tabs) {
        browser.tabs.sendMessage(volumeTarget);
    }
});

// Send volume target when popup is opened, store volume target when changed in popup
browser.runtime.onMessage.addListener((newVolumeTarget) => {
    if (newVolumeTarget === "popupOpen") {
        browser.runtime.sendMessage(parseInt(localStorage.getItem("volumeTarget")));
    } else {
        localStorage.setItem("volumeTarget", newVolumeTarget);
    }
});
