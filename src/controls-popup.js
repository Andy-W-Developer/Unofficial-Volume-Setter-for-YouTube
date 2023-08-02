const volumeTargetSlider = document.getElementById("volume-target-slider");
const volumeTarget = document.getElementById("volume-target");
volumeTarget.textContent = volumeTargetSlider.value;

volumeTargetSlider.addEventListener("input", () => {
    volumeTarget.textContent = volumeTargetSlider.value;
});
