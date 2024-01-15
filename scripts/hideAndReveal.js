const fs = require('fs')
const steggy = require('steggy')
const path = require('node:path')
const FileType = require('file-type');
const hide = ({imagePath, filesPath, password}) => {
    console.log('hide', imagePath, filesPath)
    console.log('hide-password: ', password)
    try {

        const image = fs.readFileSync(imagePath)
        const file = fs.readFileSync(filesPath)

        const concealed = steggy.conceal(password ?? undefined)(image, file)
        fs.writeFileSync(path.join(__dirname, '../output/' + Date.now() + '.png'), concealed)
        return true
    } catch (e) {
        throw e
    }
}

const reveal = async ({imagePath, password}) => {
    const image = fs.readFileSync(imagePath)
    console.log('reveal', imagePath)
    console.log('reveal-password: ', password)
    try {

        const revealed = steggy.reveal(password)(image)
        const fileInfo = await FileType.fromBuffer(revealed)

        fs.writeFileSync(path.join(__dirname, `../output/${Date.now()}.${fileInfo.ext}`), revealed)
        return true
    } catch (e) {
        throw e
    }

}

module.exports = { hide, reveal }
