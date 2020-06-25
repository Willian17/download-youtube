const express = require('express')
const app = express()
const download = require('./function/download')

app.use(express.json())

app.get('/', (req, res) => {
     res.sendFile(__dirname + '/index.html')
})

app.post('/download', (req, res) => {
     const { linkVideo, isPlaylist } = req.body
     download(linkVideo , isPlaylist)
     res.send()
})



const porta = 3333
app.listen(porta, () => {
     console.log('servidor ligado na porta ' + porta)
})