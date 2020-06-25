const fs = require('fs')
const youtubedl = require('youtube-dl')

module.exports = function download(url , isPlaylist) {
    const video = youtubedl(url)

    video.on('error', function error(err) {
         console.log(' [x] erro no download !!!')
         video.on('next' , download)
    })
    let size = 0
    video.on('info', info => {
         console.log(` [x] download ${info._filename} iniciado`)
         video.pipe(fs.createWriteStream(`src/assets/${info._filename}`))
         size = info.size
    })

    let pos = 0
    video.on('data', chunk => {
         pos += chunk.length
         if (size) {
              let porcent = (pos / size * 100).toFixed(2)
              process.stdout.cursorTo(0)
              process.stdout.clearLine(1)
              process.stdout.write(porcent + '%')
         }
    })
    video.on('end', (info) => {
         console.log('')
         console.log(' [x] download concluido com sucesso')
    })
    if (isPlaylist) {
         video.on('next', download)
    }
}