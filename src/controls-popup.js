const volumeTargetSlider = document.getElementById("volume-target-slider");
var volumeTarget = 1;

volumeTargetSlider.addEventListener("input", () => {
    browser.tabs.query({}).then((tabs) => {
        // 20 is the center of the volume slider, the range is 0 to 40
        if (volumeTargetSlider.value == 20) {
            volumeTarget = 1;
        } else if (volumeTargetSlider.value < 20) {
            volumeTarget = 0 + ((1 / 20) * volumeTargetSlider.value);
        } else {
            volumeTarget = volumeTargetSlider.value - 19;
        }

        for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id, {volumeTarget: volumeTarget});
        }
    });
});
