let volumeDecibel = 0;
let volumeDecibelTarget = 1; // 1 is 0dBFS

const audioContext = new AudioContext();
let videoStream = null;
let audioTrack = null;
let audioGain = audioContext.createGain();

const callback = () => {
    try {
        console.log("callback");

        parseVolumeDecibel();
        changeVolumeDecibel();
    } catch (e) {
    }
}
const videoStreamObserver = new MutationObserver(callback);

const pageManager = document.getElementById("page-manager");
const pageManagerObserver = new MutationObserver(() => {
    console.log("page manager observer");

    videoStream = document.getElementsByClassName("video-stream html5-main-video")[0];

    if (videoStream) {
        console.log("video stream found");

        audioTrack = audioContext.createMediaElementSource(videoStream);
        audioTrack.connect(audioGain).connect(audioContext.destination);

        videoStreamObserver.observe(videoStream, {attributes:true, attributeFilter:["src"]});
        pageManagerObserver.disconnect();
    }
});

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

function changeVolumeDecibel() {
    let volumeDecibelRatio = 10 ** (volumeDecibel / 20);
    let volumeDecibelGain = volumeDecibelTarget / volumeDecibelRatio;

    audioGain.gain.value = volumeDecibelGain;
}

pageManagerObserver.observe(pageManager, {childList:true, subtree:true});

browser.runtime.onMessage.addListener((listener) => {
    volumeDecibelTarget = listener;
    changeVolumeDecibel();
})

browser.runtime.sendMessage("injected");
