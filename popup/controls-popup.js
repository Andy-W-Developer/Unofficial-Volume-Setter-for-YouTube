const volumeTargetSlider = document.getElementById("volume-target-slider");
const volumeTargetText = document.getElementById("volume-target");
let volumeTarget = null;

chrome.runtime.sendMessage("popupOpen");

chrome.runtime.onMessage.addListener((storedValues) => {
    volumeTarget = storedValues["volumeTarget"];

    volumeTargetSlider.value = storedValues["volumeTarget"];
    volumeTargetText.innerText = storedValues["volumeTarget"];
});

volumeTargetSlider.addEventListener("input", () => {
    volumeTarget = volumeTargetSlider.value;
    volumeTargetText.innerText = volumeTargetSlider.value;

    chrome.runtime.sendMessage({volumeTarget: volumeTarget.toString()});

    chrome.tabs.query({}).then((tabs) => {
        for (const tab of tabs) {
            chrome.tabs.sendMessage(tab.id, volumeTarget);
        }
    });
});
