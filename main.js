const electron = require('electron');
const {app, BrowserWindow, globalShortcut} = electron;
const url = require('url');
const path = require('path');

// For exe launching
var child = require('child_process').execFile;

// For hotkeys
const els = require('electron-localshortcut');

// For live updates, reduced downtime *etc
require('electron-reload')(__dirname);

let mainWindow;

// Listen for the app to be ready
app.on('ready', () => {
  // Create new window
  mainWindow = new BrowserWindow({
    transparent: true,
    frame: false // <<< TODO: SET THIS TO FALSE WHEN DONE WITH HOTKEYS
  });

  // Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Self explanitory
  mainWindow.setAlwaysOnTop(true);
  mainWindow.setIgnoreMouseEvents(true);

  // Exe paths
  const poe_Path = "A:\\Grinding Gear Games\\Path of Exile\\PathOfExile.exe";
  const bl_Path = "C:\\Program Files\\Badlion Client\\Badlion Client.exe"

  // Hotkeys
  const quit_launcher = globalShortcut.register('Alt + q', () => { app.quit() });
  const launch_game_1 = globalShortcut.register('Alt + 1', () => { // << POE
    console.log("Launching PathOfExile.exe");
    launchexe(poe_Path);
    mainWindow.load
  });
  const launch_game_2 = globalShortcut.register('Alt + 2', () => { // << BADLION CLIENT
    console.log("Launching Badlion.exe");
    launchexe(bl_Path);
  });

  mainWindow.maximize();
});

function launchexe(path) {
  child(path, (err, data) => {
    if(err) {
      console.log(err);
      return;
    }

    console.log(data.toString());
  });
}