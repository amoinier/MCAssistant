const { app, BrowserWindow } = require('electron')


let mainWindow

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
})

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1360, height: 800, webPreferences: {experimentalFeatures: true}})
  mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  mainWindow.setMenu(null)
  mainWindow.openDevTools() 
  mainWindow.on('closed', function() {
    mainWindow = null;
  })
})
