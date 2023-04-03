var video = document.getElementById("movie_player")
var menu = new MouseEvent("contextmenu")

video.dispatchEvent(menu)

var menuItems = document.getElementsByClassName("ytp-menuitem")
var click = new MouseEvent("click")

menuItems[6].dispatchEvent(click)

var infoPanel = document.getElementsByClassName("html5-video-info-panel-content ytp-sfn-content")[0]

// EXAMPLE: Array(7) [ "", "100%", "/", "100%", "(content", "loudness", "-1.7dB)" ]
var infoPanelVolumes = infoPanel.getElementsByTagName("span")[3].textContent.split(' ')
var volumeNormalized = parseInt(infoPanelVolumes[3].replace('%', ''))
var volumeDecibel
if (infoPanelVolumes[6].includes('-')) {
    volumeDecibel = parseFloat(infoPanelVolumes[6].replace('-', '').replace('dB)',''))
}

var infoPanelClose = document.getElementsByClassName("ytp-sfn-close html5-video-info-panel-close ytp-button")[0]

infoPanelClose.dispatchEvent(click)