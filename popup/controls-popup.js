const volumeTargetSlider = document.getElementById("volume-target-slider");
var volumeTarget = -14;

browser.runtime.sendMessage("popupOpen");

browser.runtime.onMessage.addListener((storedValues) => {
    volumeTarget = storedValues["volumeTarget"];
});

volumeTargetSlider.addEventListener("input", () => {
    volumeTarget = volumeTargetSlider.value;

    browser.runtime.sendMessage({volumeTarget: volumeTarget.toString()});

    browser.tabs.query({}).then((tabs) => {
        for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id, volumeTarget);
        }
    });
});
