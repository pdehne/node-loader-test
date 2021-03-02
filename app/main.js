const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win

const gotLock = app.requestSingleInstanceLock()

if (gotLock) {
  app.commandLine.appendSwitch('disable-web-security');

  app.on('second-instance', (event, argv, cwd) => {
    if (process.platform == 'win32') {
    }

    if (win) {
      if (win.isMinimized())
        win.restore()

      win.focus()
    }
  })
}
else {
  app.quit()
}

async function createWindow() {
  win = new BrowserWindow({
    width: 1024, height: 768,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  // Load the index.html depending on production
  // or development mode

  if (process.env.WEBPACK_DEV_SERVER !== 'true') {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
  else {
    win.loadURL("http://localhost:8084")
  }

  win.maximize()

  if (process.env.NODE_ENV === "development")
    win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
