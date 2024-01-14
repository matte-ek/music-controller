const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('song', {
    update: () => ipcRenderer.invoke('update'),
    playbackControl: (action) => ipcRenderer.invoke('playbackControl', action)
})
