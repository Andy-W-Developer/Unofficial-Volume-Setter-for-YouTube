const volumeTargetSlider = document.getElementById("volume-target-slider");
volumeTarget = 1;

volumeTargetSlider.addEventListener("input", () => {
    browser.tabs.query({}).then((tabs) => {
        // 50 is the center of the volume slider, the range is 0 to 100
        if (volumeTargetSlider.value == 50) {
            volumeTarget = 1;
        } else if (volumeTargetSlider.value < 50) {
            volumeTarget = 0 + ((1 / 50) * volumeTargetSlider.value);
        } else {
            volumeTarget = volumeTargetSlider.value - 49;
        }

        for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id, {volumeTarget: volumeTarget});
        }
    });
});
