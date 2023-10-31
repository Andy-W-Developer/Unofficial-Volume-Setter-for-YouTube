const volumeTargetSlider = document.getElementById("volume-target-slider");
const volumeTargetText = document.getElementById("volume-target");
let volumeTarget = null;

browser.runtime.sendMessage("popupOpen");

browser.runtime.onMessage.addListener((storedValues) => {
    volumeTarget = storedValues["volumeTarget"];

    volumeTargetSlider.value = storedValues["volumeTarget"];
    volumeTargetText.innerText = storedValues["volumeTarget"];
});

volumeTargetSlider.addEventListener("input", () => {
    volumeTarget = volumeTargetSlider.value;
    volumeTargetText.innerText = volumeTargetSlider.value;

    browser.runtime.sendMessage({volumeTarget: volumeTarget.toString()});

    browser.tabs.query({}).then((tabs) => {
        for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id, volumeTarget);
        }
    });
});
