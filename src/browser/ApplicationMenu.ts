const TemplateMenu: any = [
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
                acclerator: 'CmdOrCtrl+R',
                click: (item: any, focusWindow: any) => {
                    if(focusWindow) focusWindow.reload()
                },
            },
            {type: 'separator'},
            {
                label: 'View mode',
                submenu: [
                    {label: 'One column mode'},
                    {label: 'Multi column mode'},
                ]
            },
            {type: 'separator'},
            {role: 'togglefullscreen',}
        ]
    },
    {
        label: 'Config',
        submenu: [
            {
                label: 'Add Organization',
            },
            {
                label: 'Add Stream',
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