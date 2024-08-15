
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { registerTitlebarIpc } from '@main/window/titlebarIpc';
import fs from 'fs';
// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#202020',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.resolve('assets/images/appIcon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY, // Ensure this path is correct
      sandbox: false,
    },
  });

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY); // Ensure this path is correct

  // Show window when it's ready
  appWindow.on('ready-to-show', () => appWindow.show());

  // Register Inter Process Communication for main process
  registerMainIPC();

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  return appWindow;
}

/**
 * Register Inter Process Communication
 */
function registerMainIPC() {
  /**
   * Handle 'create-new-file' IPC event
   */
  ipcMain.handle('create-new-file', async (event, fileName) => {
    if (!appWindow) {
      console.error('No app window available');
      return 'No app window available';
    }

    // Open a dialog to select the directory
    const result = await dialog.showOpenDialog(appWindow, {
      properties: ['openDirectory']
    });

    if (result.canceled || result.filePaths.length === 0) {
      return 'No directory selected';
    }

    const dirPath = result.filePaths[0];
    const filePath = path.join(dirPath, fileName);

    // Create the new file
    try {
      await fs.promises.writeFile(filePath, '');
      return 'File created successfully';
    } catch (err) {
      console.error('Failed to create file:', err);
      return 'Failed to create file';
    }
  });

  // Register title bar IPC if needed
  registerTitlebarIpc(appWindow);
}

// Ensure the app is created after Electron is ready
app.whenReady().then(() => {
  createAppWindow();
});

// Quit when all windows are closed (for macOS compatibility)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Recreate the window when the app is activated (for macOS compatibility)
app.on('activate', () => {
  if (appWindow === null) {
    createAppWindow();
  }
});
