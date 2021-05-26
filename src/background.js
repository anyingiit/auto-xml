'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
// import devtools from '@vue/devtools'
const url = require("url");
const path = require("path");
const fs = require('fs')
// const isDevelopment = process.env.NODE_ENV !== 'production'
const isDevelopment = require('electron-is-dev')

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // try {
    //   await installExtension(VUEJS3_DEVTOOLS)
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
    installExtension(VUEJS3_DEVTOOLS)
    .then((name) => {
      console.log(`Added Extension:  ${name}`)
      createWindow()
    })
    .catch((err) => console.log('An error occurred: ', err));
    // devtools.connect("http://localhost", 8098)
  }
})

// app.whenReady().then(() => {
//   installExtension(REDUX_DEVTOOLS)
//       .then((name) => console.log(`Added Extension:  ${name}`))
//       .catch((err) => console.log('An error occurred: ', err));
// });

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  // devtools.connect("http://localhost", 8098)
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

ipcMain.on('getXmlConfig', (event, arg) => {
  // console.log("in")
  let targetPath = path.join(__dirname, "../data/m.xml")
  // console.log(targetPath)
  fs.readFile(targetPath, "utf-8", (err, data)=>{
    if(err){
      // event.sender.send('asynchronous-reply', "读取失败");
      console.log("读取失败")
    }else{
      // event.sender.send('asynchronous-reply', data);
      console.log("读取成功:\n\t" + data.slice(0,20) + "...")
      event.reply('getXmlConfig-replay', data)
    }
  })
})
