let volumeDecibel = null;
let volumeDecibelTarget = null;

const audioContext = new AudioContext();
let audioTrack = null;
let audioGain = audioContext.createGain();

const callback = () => {
    parseVolumeDecibel();
    changeVolumeDecibel();
}
const videoStreamObserver = new MutationObserver(callback);

const pageManagerObserver = new MutationObserver(() => {
    const videoStream = document.getElementsByClassName("video-stream html5-main-video")[0];

    if (videoStream) {
        const audioTrack = audioContext.createMediaElementSource(videoStream);
        audioTrack.connect(audioGain).connect(audioContext.destination);

        videoStreamObserver.observe(videoStream, {attributes:true, attributeFilter:["src"]});
        pageManagerObserver.disconnect();
    }
});

const bodyObserver = new MutationObserver(() => {
    const pageManager = document.getElementById("page-manager");

    if (pageManager) {
        pageManagerObserver.observe(pageManager, {childList:true, subtree:true});
        bodyObserver.disconnect();
    }
});
const documentBody = document.body;

function parseVolumeDecibel() {
    const videoContainer = document.getElementById("movie_player");
    const mouseContextMenu = new MouseEvent("contextmenu");

    videoContainer.dispatchEvent(mouseContextMenu);

    const statsMenuItem = Array.from(document.getElementsByClassName("ytp-menuitem"))
        .filter(x => x.innerText.trim() === "Stats for nerds")[0];
    const mouseLeftClick = new MouseEvent("click");

    // EXAMPLE - CONTEXT MENU ITEMS AND INDEXES: Loop [0], Copy video URL [1], Copy video URL at current time [2], Copy embed code [3]
    //                                           Copy debug info [4], Troubleshoot playback issue [5], Stats for nerds [6]
    statsMenuItem.dispatchEvent(mouseLeftClick);

    // EXAMPLE - PANEL VOLUMES: Array(7) [ "", "100%", "/", "100%", "(content", "loudness", "-1.7dB)" ]
    const infoPanel = document.getElementsByClassName("html5-video-info-panel-content ytp-sfn-content")[0];
    const infoPanelVolumes = infoPanel.getElementsByTagName("span")[3].textContent.split(' ');
    const infoPanelButtonClose = document.getElementsByClassName("ytp-sfn-close html5-video-info-panel-close ytp-button")[0];

    infoPanelButtonClose.dispatchEvent(mouseLeftClick);

    volumeDecibel = parseFloat(infoPanelVolumes[6].replace('dB)',''));
    // YouTube automatically lowers the volumes of videos louder than 0dBFS to 0dBFS
    if (volumeDecibel > 0) {
        volumeDecibel = 0;
    }

    // 0dB in YouTube is -14dB LUFS
    volumeDecibel = volumeDecibel - 14;
}

function changeVolumeDecibel() {
    const volumeDecibelRatio = 10 ** (volumeDecibel / 20);
    const volumeDecibelTargetRatio = 10 ** (volumeDecibelTarget / 20);
    const volumeDecibelGain = volumeDecibelTargetRatio / volumeDecibelRatio;

    audioGain.gain.value = volumeDecibelGain;
}


chrome.runtime.onMessage.addListener((listener) => {
    volumeDecibelTarget = listener;

    parseVolumeDecibel();
    changeVolumeDecibel();
})

chrome.runtime.sendMessage("injected");

// bodyObserver -> pageManager -> videoStream
bodyObserver.observe(documentBody, {childList:true, subtree:true});
