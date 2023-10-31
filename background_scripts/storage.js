function sendVolumeTargetOnStartup() {
    let volumeTarget = localStorage.getItem("volumeTarget");

    if (volumeTarget === null) {
        localStorage.setItem("volumeTarget", "-14");
        volumeTarget = -14;
    } else {
        volumeTarget = parseInt(volumeTarget);
    }

    browser.tabs.query({}).then((tabs) => {
        for (const tab of tabs) {
            browser.tabs.sendMessage(volumeTarget);
        }
    });
}

// Send volume target when popup is opened, store volume target when changed in popup
browser.runtime.onMessage.addListener((newValues) => {
    if (newValues === "popupOpen") {
        browser.runtime.sendMessage({volumeTarget: parseInt(localStorage.getItem("volumeTarget"))});
    } else if (newValues === "injected") {
        browser.tabs.query({}).then((tabs) => {
            for (const tab of tabs) {
                browser.tabs.sendMessage(tab.id, parseInt(localStorage.getItem("volumeTarget")));
            }
        });
    } else {
        localStorage.setItem("volumeTarget", newValues["volumeTarget"]);
    }
});

sendVolumeTargetOnStartup();
