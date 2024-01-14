const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { execSync } = require('child_process');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 100,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true
  })

  win.loadFile('index.html')
}

const getSongData = () => {
  try {
    // TODO: this shouldn't be hardcoded
    var output = execSync('playerctl metadata').toString();
    var status = execSync('playerctl status').toString();

    var title = null;
    var artist = null;
    var albumArt = null;
    var songLength = null;

    output.split('\n').forEach(x => {
        if (x.includes("xesam:title"))
          title = x.substring(34);
        if (x.includes("xesam:artist"))
          artist = x.substring(34);
        if (x.includes("artUrl"))
          albumArt = x.substring(34);
        if (x.includes("mpris:length"))
          songLength = x.substring(34);
    });

    var songLengthSeconds = parseFloat(songLength) / 10**6;
    var currentPositionSeconds = parseFloat(execSync("playerctl position"));
    var currentPosition = (currentPositionSeconds / songLengthSeconds) * 100.0;

    return {
      title: title,
      artist: artist,
      albumArt: albumArt,
      position: currentPosition,
      isPlaying: status.includes("Playing"),
      success: true
    };
  } catch (error) {
    console.log(error);

    return {
      success: false
    };
  }
};

const handlePlaybackControl = (action) => {
  switch (action)
  {
    case "next":
      execSync('playerctl next');
      break;
    case "previous":
      execSync('playerctl previous');
      break;
    case "play-pause":
      execSync('playerctl play-pause');
      break;  
    default:
      break;
  }
};

app.whenReady().then(() => {
  ipcMain.handle('update', () => getSongData());
  ipcMain.handle('playbackControl', (event, action) => handlePlaybackControl(action));
  createWindow()
})