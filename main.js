const {app, BrowserWindow, globalShortcut, Menu, ipcMain} = require('electron')
const {mainMenuTemplate} = require("./const/MainMenu");
try {
    require('electron-reloader')(module)
} catch (_) {
}

const path = require('node:path')
const {hide, reveal} = require("./scripts/hideAndReveal");
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        titleBarStyle: "customButtonsOnHover",
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be',
            height: 60
        },
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })


    win.webContents.openDevTools()
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

    Menu.setApplicationMenu(mainMenu)

    ipcMain.on('hide-files', (event, hideObj) => {
        try {

           if(hide(hideObj)) {
               win.webContents.send('error-captured', '')
           }
        } catch (e) {
            console.log(e);
            win.webContents.send('error-captured', e)
        }
    })

    ipcMain.on('reveal-file', (event, revealObj) => {
        try {
            if(reveal(revealObj)) {
                win.webContents.send('error-captured', '')
            }
        } catch (e) {
            console.log(e);
            win.webContents.send('error-captured', e)
        }

    })

    win.loadFile('index.html')


}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

