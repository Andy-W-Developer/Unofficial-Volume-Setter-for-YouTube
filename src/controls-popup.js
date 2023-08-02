const volumeTargetSlider = document.getElementById("volume-target-slider");

volumeTargetSlider.addEventListener("input", () => {
    browser.tabs.query({}).then((tabs) => {
        for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id, {volumeTarget: volumeTargetSlider.value});
        }
    });
});
