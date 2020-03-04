import { app, App, BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store'
import windowStateKeeper from 'electron-window-state'

class SampleApp {
    private mainWindow: BrowserWindow | null = null;
    private app: App;
    private mainURL: string = `file://${__dirname}/../renderer/index.html`
    private store: Store<any>
    private mainWindowState!: windowStateKeeper.State;

    constructor(app: App) {
        this.app = app;
        this.app.on('window-all-closed', this.onWindowAllClosed.bind(this))
        this.app.on('ready', this.create.bind(this));
        this.app.on('activate', this.onActivated.bind(this));
        this.store = new Store()
    }

    private onWindowAllClosed() {
        this.app.quit();
    }

    private create() {
        this.mainWindowState = windowStateKeeper({})

        this.mainWindow = new BrowserWindow({
            x: this.mainWindowState.x,
            y: this.mainWindowState.y,
            width: this.mainWindowState.width,
            height: this.mainWindowState.height,
            acceptFirstMouse: true,
            titleBarStyle: 'hidden',
            webPreferences: {
                nodeIntegration: true
            }
        });

        this.mainWindow.loadURL(this.mainURL);
        this.mainWindowState.manage(this.mainWindow);

        this.mainWindow.webContents.openDevTools({
            mode: 'detach',
        })

        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });

        ipcMain.on('resize', (event, data) => {
            const [width, height] = this.mainWindow?.getSize() as [number, number]
            this.mainWindow?.setSize(width + (data.expand? +100: -100), height)

            this.store.set('expand', data.expand)
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
