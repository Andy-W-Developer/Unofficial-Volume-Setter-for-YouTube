const volumeTargetSlider = document.getElementById("volume-target-slider");
const volumeTarget = document.getElementById("volume-target");
volumeTarget.textContent = volumeTargetSlider.value;

volumeTargetSlider.addEventListener("input", () => {
    volumeTarget.textContent = volumeTargetSlider.value;

    browser.tabs.query().then((tabs) => {
        for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id, {volumeTarget: volumeTargetSlider.value});
        }
    });
});
