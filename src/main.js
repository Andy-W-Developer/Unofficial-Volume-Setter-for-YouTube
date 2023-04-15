import {videoPanelOpen, videoPanelSelectIndex, videoInfoPanelClose} from "./modules/panels.mjs"

videoPanelOpen();

videoPanelSelectIndex(6);

var infoPanel = document.getElementsByClassName("html5-video-info-panel-content ytp-sfn-content")[0];

// EXAMPLE: Array(7) [ "", "100%", "/", "100%", "(content", "loudness", "-1.7dB)" ]
var infoPanelVolumes = infoPanel.getElementsByTagName("span")[3].textContent.split(' ');
var volumeDecibel
if (infoPanelVolumes[6].includes('-')) {
    volumeDecibel = parseFloat(infoPanelVolumes[6].replace('dB)',''));
    if (volumeDecibel < -15) {
        volumeDecibel = -15;
    }

    const audioContext = new AudioContext();
    const audio = document.getElementsByClassName("video-stream html5-main-video")[0];

    const track = audioContext.createMediaElementSource(audio);
    var audioGain = audioContext.createGain();

    volumeRatio = 10 ** (volumeDecibel / 20);
    volumeGain = 1 / volumeRatio;

    audioGain.gain.value = volumeGain;

    track.connect(audioGain).connect(audioContext.destination);
}

videoInfoPanelClose();
