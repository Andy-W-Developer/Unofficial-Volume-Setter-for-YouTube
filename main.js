var video = document.getElementById("movie_player")
var contextMenu = new MouseEvent("contextmenu")

video.dispatchEvent(contextMenu)

var volumeVideo
var volumeGain
var volumeVideoNew

var contextMenuItems = document.getElementsByClassName("ytp-menuitem")