const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    hideFiles: (hideObj) => ipcRenderer.send('hide-files', hideObj),
    revealFile: (revealObj) => ipcRenderer.send('reveal-file', revealObj),
    onErrorCaptured: (callback) =>
        ipcRenderer.on('error-captured',(_event, value) => callback(value)),
})
