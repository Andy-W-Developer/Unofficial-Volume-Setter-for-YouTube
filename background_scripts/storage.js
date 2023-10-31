function sendVolumeTargetOnStartup() {
    let volumeTarget = localStorage.getItem("volumeTarget");

    if (volumeTarget === null) {
        localStorage.setItem("volumeTarget", "-14");
        volumeTarget = -14;
    } else {
        volumeTarget = parseInt(volumeTarget);
    }

    chrome.tabs.query({}, (tabs) => {
        for (const tab of tabs) {
            chrome.tabs.sendMessage(tab.id, volumeTarget);
        }
    });
}

// Send volume target when popup is opened, store volume target when changed in popup
chrome.runtime.onMessage.addListener((newValues) => {
    if (newValues === "popupOpen") {
        chrome.runtime.sendMessage({volumeTarget: parseInt(localStorage.getItem("volumeTarget"))});
    } else if (newValues === "injected") {
        chrome.tabs.query({}, (tabs) => {
            for (const tab of tabs) {
                chrome.tabs.sendMessage(tab.id, parseInt(localStorage.getItem("volumeTarget")));
            }
        });
    } else {
        localStorage.setItem("volumeTarget", newValues["volumeTarget"]);
    }
});

sendVolumeTargetOnStartup();
