function videoPanelOpen() {
    var video = document.getElementById("movie_player");
    var menu = new MouseEvent("contextmenu");

    video.dispatchEvent(menu);
}

function videoPanelSelectIndex(index) {
    var menuItems = document.getElementsByClassName("ytp-menuitem");
    var click = new MouseEvent("click");

    menuItems[index].dispatchEvent(click);
}

function videoPanelSelectString(option) {

}

function videoInfoPanelClose() {
    var infoPanelClose = document.getElementsByClassName("ytp-sfn-close html5-video-info-panel-close ytp-button")[0];
}

export {videoPanelOpen,
        videoPanelSelectIndex,
        videoPanelSelectString,
        videoInfoPanelClose}
