var video = document.getElementById("movie_player")
var contextMenu = new MouseEvent("contextmenu")

video.dispatchEvent(contextMenu)

var contextMenuItems = document.getElementsByClassName("ytp-menuitem")
var click = new MouseEvent("click")

contextMenuItems[6].dispatchEvent(click)

var infoPanel = document.getElementsByClassName("html5-video-info-panel-content ytp-sfn-content")[0]

var infoPanelVolumes = infoPanel.getElementsByTagName("span")[3].textContent.split(' ')
var volumeNormalized = parseInt(infoPanelVolumes[3].replace('%', ''))
var volumeDecibel
if (infoPanelVolumes[6].includes('-')) {
    volumeDecibel = parseInt(infoPanelVolumes[6].replace('-', '').replace('dB)',''))
}