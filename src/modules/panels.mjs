function videoPanelOpen() {
    var video = document.getElementById("movie_player");
    var menu = new MouseEvent("contextmenu");

    video.dispatchEvent(menu);
}

function videoPanelSelect(index) {
    var menuItems = document.getElementsByClassName("ytp-menuitem");
    var click = new MouseEvent("click");

    menuItems[index].dispatchEvent(click);
}

function videoInfoPanelClose() {
    var infoPanelClose = document.getElementsByClassName("ytp-sfn-close html5-video-info-panel-close ytp-button")[0];
    var click = new MouseEvent("click");

    infoPanelClose.dispatchEvent(click);
}

export {videoPanelOpen, videoPanelSelect, videoInfoPanelClose};
