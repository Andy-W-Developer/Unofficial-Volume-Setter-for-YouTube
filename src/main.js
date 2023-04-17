import * as panels from "/modules/panels.mjs";
import * as parse from "/modules/parse.mjs";
import * as volume from "/modules/volume.mjs";

panels.videoPanelOpen();
panels.videoPanelSelect(6);

volumeDecibel = parse.parseVolumes();

panels.videoInfoPanelClose();

volume.volumeChange(volumeDecibel);
