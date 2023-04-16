function volumeChange(dBFS) {
    const audioContext = new AudioContext();
    const audio = document.getElementsByClassName("video-stream html5-main-video")[0];

    const track = audioContext.createMediaElementSource(audio);
    var audioGain = audioContext.createGain();

    volumeRatio = 10 ** (dBFS / 20);
    volumeGain = 1 / volumeRatio;

    audioGain.gain.value = volumeGain;

    track.connect(audioGain).connect(audioContext.destination);
}

export {volumeChange};
