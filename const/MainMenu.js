
const isMac = process.platform === 'darwin'

const mainMenuTemplate = [
    {
        label: 'Info',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
];

module.exports = { mainMenuTemplate, isMac }
