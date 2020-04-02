/**
 * CMDCNTRv1 (CmdCntr^1)
 * AUTHOR : ANTHONY DEFOE 
 * (MIT LISENSE)
 */

const electron = require('electron');
const {app, BrowserWindow, globalShortcut, ipcMain} = electron;
const url = require('url');
const path = require('path');

// For exe launching
var child = require('child_process').execFile;

// For live updates, reduced downtime *etc
require('electron-reload')(__dirname);

// Quicklaunch paths
global.shortcuts = {
  path_1 : "A:\\Grinding Gear Games\\Path of Exile\\PathOfExile.exe",
  path_2 : "C:\\Program Files (x86)\\Minecraft\\MinecraftLauncher.exe"
}

// INIT
let mainWindow;

// Listen for the app to be ready
app.on('ready', () => {
  // Create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    icon: __dirname + "/icon.png",
    transparent: true,
    frame: false
  });

  // Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow/mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Self explanitory
  mainWindow.setAlwaysOnTop(true);
  mainWindow.setIgnoreMouseEvents(true);

  // Hotkeys
  const quit_launcher = globalShortcut.register('Alt + q', () => { app.quit() });
  let mouseCapture = false;
  const toggle_mouse_capture = globalShortcut.register('Alt + c', () => {
    switch(mouseCapture){
      case false:
        mouseCapture = true;
        mainWindow.focus();
        mainWindow.setIgnoreMouseEvents(false);
        break;
      case true:
        mouseCapture = false;
        mainWindow.setIgnoreMouseEvents(true);
        break;
    };
  });
  const launch_app_1 = globalShortcut.register('Alt + 1', () => { // << POE
    launchexe(global.shortcuts.path_1);
    mainWindow.load
  });
  const launch_app_2 = globalShortcut.register('Alt + 2', () => { // << MINECRAFT
    launchexe(global.shortcuts.path_2);
  });

  mainWindow.maximize();
});

// Launch path
function launchexe(path) {
  child(path, (err, data) => {
    if(err) {
      console.log(err);
      return;
    }

    console.log(data.toString());
  });
}