// Send volume target to all tabs on extension startup
var volumeTarget = localStorage.getItem("volumeTarget");
var sliderValue = localStorage.getItem("sliderValue");

if (volumeTarget === null) {
    localStorage.setItem("volumeTarget", "1");
    volumeTarget = 1;
} else {
    volumeTarget = parseFloat(volumeTarget);
}

if (sliderValue === null) {
    localStorage.setItem("sliderValue", "20");
    sliderValue = 20;
} else {
    sliderValue = parseInt(sliderValue);
}

browser.tabs.query({}).then((tabs) => {
    for (const tab of tabs) {
        browser.tabs.sendMessage(volumeTarget);
    }
});

// Send volume target when popup is opened, store volume target when changed in popup
browser.runtime.onMessage.addListener((newValues) => {
    if (newValues === "popupOpen") {
        browser.runtime.sendMessage({volumeTarget: parseFloat(localStorage.getItem("volumeTarget")),
                                     sliderValue: parseInt(localStorage.getItem("sliderValue"))});
    } else {
        localStorage.setItem("volumeTarget", newValues["volumeTarget"]);
        localStorage.setItem("sliderValue", newValues["sliderValue"]);
    }
});
