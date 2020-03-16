import { app, App, BrowserWindow, ipcMain, Menu } from 'electron';
import Store from 'electron-store'
import windowStateKeeper from 'electron-window-state'
import TemplateMenu from './ApplicationMenu';
import { ViewMode } from '../types/ViewMode';

export class SampleApp {
    mainWindow: BrowserWindow | null = null;
    app: App;
    mainURL: string = `file://${__dirname}/../renderer/index.html`
    store: Store<any>
    mainWindowState!: windowStateKeeper.State;

    constructor(app: App) {
        this.app = app;
        this.app.on('window-all-closed', this.onWindowAllClosed.bind(this))
        this.app.on('ready', this.create.bind(this));
        this.app.on('activate', this.onActivated.bind(this));
        this.store = new Store()
    }

    onWindowAllClosed() {
        this.app.quit();
    }

    onModeChanged(viewMode: ViewMode) {
        if (ViewMode.OneColumn == viewMode) {
            const [width, height] = this.mainWindow?.getSize() as [number, number]
            const expand =this.store.get('expand', true)
            this.mainWindow?.setSize(316 + (expand? 150: 50), height)
        }
    }

    create() {
        this.mainWindowState = windowStateKeeper({})

        this.mainWindow = new BrowserWindow({
            x: this.mainWindowState.x,
            y: this.mainWindowState.y,
            width: this.mainWindowState.width,
            height: this.mainWindowState.height,
            acceptFirstMouse: true,
            webPreferences: {
                nodeIntegration: true
            }
        });

        this.mainWindow.loadURL(this.mainURL);
        this.mainWindowState.manage(this.mainWindow);

        const menu = Menu.buildFromTemplate(TemplateMenu(this));
        Menu.setApplicationMenu(menu)

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

    onReady() {
        this.create();
    }

    onActivated() {
        if (this.mainWindow === null) {
            this.create();
        }
    }
}

const MyApp: SampleApp = new SampleApp(app)
