import { SampleApp } from '.'

const TemplateMenu: any = (window: SampleApp) => [
    {
        label: 'File',
        submenu: [
            {role: 'quit'},
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: (item: any, focusWindow: any) => {
                    if(focusWindow) focusWindow.reload()
                },
            },
            // {type: 'separator'},
            // {
            //     label: 'View mode',
            //     submenu: [
            //         {
            //             label: 'One column mode',
            //             click: () => window.onModeChanged(ViewMode.OneColumn),
            //         },
            //         {
            //             label: 'Multi column mode',
            //             click: () => window.onModeChanged(ViewMode.MultiColumn),
            //         },
            //     ]
            // },
            // {type: 'separator'},
            {role: 'togglefullscreen',}
        ]
    },
    {
        label: 'Config',
        submenu: [
            {
                label: 'Add Organization',
                click: () => {window.mainWindow?.webContents.send('addOrganization')}
            },
            {
                label: 'Add Stream',
                click: () => {window.mainWindow?.webContents.send('addStream')}
            },
            {
                label: 'List Organization / Stream',
            },
            {
                label: 'Backup',
                submenu: [
                    {label: 'Import'},
                    {label: 'Export'}
                ]
            },
            {type: 'separator'},
        ]
    }
]

export default TemplateMenu