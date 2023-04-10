var video = document.getElementById("movie_player");
var menu = new MouseEvent("contextmenu");

video.dispatchEvent(menu);

var menuItems = document.getElementsByClassName("ytp-menuitem");
var click = new MouseEvent("click");

menuItems[6].dispatchEvent(click);
