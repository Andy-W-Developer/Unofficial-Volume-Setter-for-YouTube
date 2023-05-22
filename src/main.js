// *Open the Stats for nerds panel
var videoContainer = document.getElementById("movie_player");
var mouseContextMenu = new MouseEvent("contextmenu");

videoContainer.dispatchEvent(menu);

var contextMenuItems = document.getElementsByClassName("ytp-menuitem");
var mouseLeftClick = new MouseEvent("click");

contextMenuItems[6].dispatchEvent(click);

// *Parse volumes
// EXAMPLE: Array(7) [ "", "100%", "/", "100%", "(content", "loudness", "-1.7dB)" ]
var infoPanel = document.getElementsByClassName("html5-video-info-panel-content ytp-sfn-content")[0];
var infoPanelVolumes = infoPanel.getElementsByTagName("span")[3].textContent.split(' ');

var volumeDecibel = parseFloat(infoPanelVolumes[6].replace('dB)',''));
// YouTube automatically lowers the volumes of videos louder than 0dBFS to 0dBFS
if (volumeDecibel > 0) {
    volumeDecibel = 0;
}

// *Close the Stats for nerds window
var infoPanelButtonClose = document.getElementsByClassName("ytp-sfn-close html5-video-info-panel-close ytp-button")[0];
var click = new MouseEvent("click");

infoPanelButtonClose.dispatchEvent(click);

// Change audio volume using Web Audio API
var volumeDecibelTarget = 1; // 1 is 0dBFS

const audioContext = new AudioContext();
const videoStream = document.getElementsByClassName("video-stream html5-main-video")[0];

const audioTrack = audioContext.createMediaElementSource(audio);
var audioGain = audioContext.createGain();

volumeRatio = 10 ** (volumeDecibel / 20);
volumeGain = volumeTarget / volumeRatio;

audioGain.gain.value = volumeGain;

track.connect(audioGain).connect(audioContext.destination);
