const refreshSongData = async () => {
    const response = await window.song.update()

    if (response == undefined || response.success != true)
    {
        console.log("Error obtaining song data.");
        return;
    }

    document.getElementById("title").innerText = response.title;
    document.getElementById("artist").innerText = response.artist;
    document.getElementById("play-pause-icon").innerText = response.isPlaying ? "pause" : "play_arrow";
    document.getElementById("progress-fill").style.width = `${response.position}%`;
    document.getElementById("album-art").style.backgroundImage = `url(${response.albumArt})`;
    document.getElementById("album-art-blur").style.backgroundImage = `url(${response.albumArt})`;

    setTimeout(refreshSongData, 1000);
}

const previousTrack = () => {
    window.song.playbackControl("previous");
};

const nextTrack = () => {
    window.song.playbackControl("next");
};

const playPause = () => {
    window.song.playbackControl("play-pause");
};
  
refreshSongData()