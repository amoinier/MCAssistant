const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

let mainWindow

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1360, height: 800, webPreferences: {experimentalFeatures: true, nodeIntegration: true}})
  mainWindow.loadURL(isDev ? `http://localhost:8080/` : `file://${__dirname}/public/index.html`)
  mainWindow.setMenu(null)
  if (isDev)
    mainWindow.openDevTools() 
  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
