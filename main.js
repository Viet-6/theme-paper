const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        fullscreen: true,
        autoHideMenuBar: true,
        frame: false,
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})