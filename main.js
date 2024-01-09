const { app, BrowserWindow, ipcMain } = require('electron');

const schedule = require('node-schedule');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  // mainWindow.webContents.openDevTools();

  // Load your HTML file or web page here
  mainWindow.loadFile('index.html');

  // Listen for the toggle message
  ipcMain.on('toggle-always-on-top', () => {
    const isAlwaysOnTop = mainWindow.isAlwaysOnTop();
    mainWindow.setAlwaysOnTop(false);
});

  // Start the flashing interval every 1 minute
  // setInterval(flashWindow, 30 * 60 * 1000); // 30 minutes interval
  // setInterval(flashWindow, 5000); // 5 seconds interval

  // schedule job every 30 minutes
  const job = schedule.scheduleJob('*/1 * * * *', function(){
    console.log('flashing window')
    flashWindow();
  });
});

function flashWindow() {
  if (mainWindow) {
    if (mainWindow.isFocused()) {
      mainWindow.flashFrame(false);
    } else {
      mainWindow.focus()
      mainWindow.setAlwaysOnTop(true, 'normal');
      mainWindow.flashFrame(true);
    }
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
