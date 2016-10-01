import { app, BrowserWindow } from 'electron';

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

async function installExtensions(extensions) {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {}
    }
  }
}

app.on('ready', async () => {
  await installExtensions([
    'REACT_DEVELOPER_TOOLS'
  ]);

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }
});
