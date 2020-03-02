import { app, App, BrowserWindow, ipcMain } from 'electron';

class SampleApp {
    private mainWindow: BrowserWindow | null = null;
    private app: App;
    private mainURL: string = `file://${__dirname}/../renderer/index.html`

    constructor(app: App) {
        this.app = app;
        this.app.on('window-all-closed', this.onWindowAllClosed.bind(this))
        this.app.on('ready', this.create.bind(this));
        this.app.on('activate', this.onActivated.bind(this));
    }

    private onWindowAllClosed() {
        this.app.quit();
    }

    private create() {
        this.mainWindow = new BrowserWindow({
            width: 800,
            height: 400,
            acceptFirstMouse: true,
            titleBarStyle: 'hidden',
            webPreferences: {
                nodeIntegration: true
            }
        });

        this.mainWindow.loadURL(this.mainURL);

        this.mainWindow.webContents.openDevTools({
            mode: 'detach',
        })

        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });

        ipcMain.on("resize", (event, data) => {
            const [width, height] = this.mainWindow?.getSize() as [number, number]
            console.log(width + data.expand? +100: -100)
            this.mainWindow?.setSize(width + (data.expand? +100: -100), height)
        });

    }

    private onReady() {
        this.create();
    }

    private onActivated() {
        if (this.mainWindow === null) {
            this.create();
        }
    }
}

const MyApp: SampleApp = new SampleApp(app)
