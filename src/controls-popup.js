const volumeTargetSlider = document.getElementById("volume-target-slider");
var volumeTarget = 1;

browser.runtime.sendMessage("popupOpen");

browser.runtime.onMessage.addListener((storedValues) => {
    volumeTarget = storedValues["volumeTarget"];
    volumeTargetSlider.value = storedValues["sliderValue"];
});

volumeTargetSlider.addEventListener("input", () => {
    // 20 is the center of the volume slider, the range is 0 to 40
    if (volumeTargetSlider.value == 20) {
        volumeTarget = 1;
    } else if (volumeTargetSlider.value < 20) {
        volumeTarget = 0 + ((1 / 20) * volumeTargetSlider.value);
    } else {
        volumeTarget = volumeTargetSlider.value - 19;
    }

    browser.runtime.sendMessage({volumeTarget: volumeTarget.toString(),
                                 sliderValue: volumeTargetSlider.value.toString()});

    browser.tabs.query({}).then((tabs) => {
        for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id, {volumeTarget: volumeTarget});
        }
    });
});
