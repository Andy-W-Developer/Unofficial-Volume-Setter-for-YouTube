function parseVolumeDecibel() {
    let videoContainer = document.getElementById("movie_player");
    let mouseContextMenu = new MouseEvent("contextmenu");

    videoContainer.dispatchEvent(mouseContextMenu);

    let contextMenuItems = document.getElementsByClassName("ytp-menuitem");
    let mouseLeftClick = new MouseEvent("click");

    // EXAMPLE - CONTEXT MENU ITEMS AND INDEXES: Loop [0], Copy video URL [1], Copy video URL at current time [2], Copy embed code [3]
    //                                           Copy debug info [4], Troubleshoot playback issue [5], Stats for nerds [6]
    contextMenuItems[6].dispatchEvent(mouseLeftClick);

    // EXAMPLE - PANEL VOLUMES: Array(7) [ "", "100%", "/", "100%", "(content", "loudness", "-1.7dB)" ]
    let infoPanel = document.getElementsByClassName("html5-video-info-panel-content ytp-sfn-content")[0];
    let infoPanelVolumes = infoPanel.getElementsByTagName("span")[3].textContent.split(' ');
    let infoPanelButtonClose = document.getElementsByClassName("ytp-sfn-close html5-video-info-panel-close ytp-button")[0];

    infoPanelButtonClose.dispatchEvent(mouseLeftClick);

    volumeDecibel = parseFloat(infoPanelVolumes[6].replace('dB)',''));
    // YouTube automatically lowers the volumes of videos louder than 0dBFS to 0dBFS
    if (volumeDecibel > 0) {
        volumeDecibel = 0;
    }
}

const audioContext = new AudioContext();
const videoStream = document.getElementsByClassName("video-stream html5-main-video")[0];
const audioTrack = audioContext.createMediaElementSource(audio);
var audioGain = audioContext.createGain();

track.connect(audioGain).connect(audioContext.destination);

var volumeDecibelTarget = 1; // 1 is 0dBFS

function changeVolumeDecibel() {
    let volumeDecibelRatio = 10 ** (volumeDecibel / 20);
    let volumeDecibelGain = volumeDecibelTarget / volumeDecibelRatio;

    audioGain.gain.value = volumeDecibelGain;
}

const callback = () => {
    try {
        parseVolumeDecibel();
        changeVolumeDecibel();
    } catch (e) {
        console.log(e);
    }
}

const videoStreamObserver = new MutationObserver(callback);
videoStreamObserver.observe(videoStream, {attributes:true, attributeFilter:["src"]});
