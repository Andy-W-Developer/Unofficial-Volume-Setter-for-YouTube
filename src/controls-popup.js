const volumeTargetSlider = document.getElementById("volume-target-slider");
localStorage.setItem("volumeTarget", '1')

volumeTargetSlider.addEventListener("input", () => {
    browser.tabs.query({}).then((tabs) => {
        // 50 is the center of the volume slider, the range is 0 to 100
        if (volumeTargetSlider.value == 50) {
            localStorage.setItem("volumeTarget", '1');
        } else if (volumeTargetSlider.value < 50) {
            localStorage.setItem("volumeTarget", (0 + ((1 / 50) * volumeTargetSlider.value)).toString());
        } else {
            volumeTarget = (volumeTargetSlider.value - 49).toString();
        }

        for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id, {volumeTarget: Integer.parseInt(localStorage.getItem("volumeTarget"))});
        }
    });
});
