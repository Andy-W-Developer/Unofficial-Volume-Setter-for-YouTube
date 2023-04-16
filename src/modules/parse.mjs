function parseVolumes() {
    var infoPanel = document.getElementsByClassName("html5-video-info-panel-content ytp-sfn-content")[0];

    // EXAMPLE: Array(7) [ "", "100%", "/", "100%", "(content", "loudness", "-1.7dB)" ]
    var infoPanelVolumes = infoPanel.getElementsByTagName("span")[3].textContent.split(' ');
    var volumeDecibel
    if (infoPanelVolumes[6].includes('-')) {
        volumeDecibel = parseFloat(infoPanelVolumes[6].replace('dB)',''));
        if (volumeDecibel < -8) {
            volumeDecibel = -8;
        }
    }

    return volumeDecibel;
}

export {parseVolumes};
