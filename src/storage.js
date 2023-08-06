// Send volume target on extension startup
var volumeTarget = localStorage.getItem("volumeTarget");

if (volumeTarget === null) {
    localStorage.setItem("volumeTarget", "1");
    volumeTarget = 1;
} else {
    volumeTarget = parseInt(volumeTarget);
}

browser.tabs.query({}).then((tabs) => {
    for (const tab of tabs) {
        browser.tabs.sendMessage({volumeTarget});
    }
});

// Store volume target when changed in popup
browser.runtime.onMessage.addListener((newVolumeTarget) => {
    localStorage.setItem("volumeTarget", newVolumeTarget);
});
