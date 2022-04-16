const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const mm = require("music-metadata")
const fs = require("fs")
const crypto = require("crypto")



const clientId = fs.readFileSync("./server/rpc-clientid").toString()
console.log(clientId)

const DiscordRPC = require("discord-rpc")
DiscordRPC.register(clientId)

const startTimestamp = Date.now()

const rpc = new DiscordRPC.Client({transport: "ipc"})
rpc.on("ready", () => {
  rpc.setActivity({
    details: "Idling",
    largeImageKey: "default",
    state: "Probably fixing a bug.",
    startTimestamp
  })
})
rpc.login({clientId})





let app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp"
}))

function generateID() {

}

app.post("/upload", async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length <= 0) {
        return res.status(400).send("No files were uploaded.")
    }

    let file = req.files["song-upload"]
    if(!file || !(file.name.endsWith(".flac") | file.name.endsWith(".mp3") | file.name.endsWith(".ogg") | file.name.endsWith(".wav"))) {
      return res.sendStatus(404)
    }

    const fileID = crypto.randomUUID()
    const filename = fileID + "." + file.name.split(".").pop()
    console.log(filename)

    file.mv("./static/songs/" + filename, async (err) => {
        if(err) return res.status(500).send(err)

        const metadata = await mm.parseFile("./static/songs/" + filename)

        let hasCover = metadata.common.picture != undefined

        let data = {
          image: hasCover ? "/song_images/" + fileID : "/default.jpg",
          title: metadata.common.title.replace(`${metadata.common.artist} - `, ""),
          author: metadata.common.artist,
          srcType: file.name.split(".").pop(),
          id: fileID
        }



        fs.writeFileSync("./data/songs/" + fileID, JSON.stringify(data))
        if(hasCover)
            fs.writeFileSync("./static/song_images/" + fileID, metadata.common.picture[0].data)

        return res.send(data)
    })
})



app.post("/discord-rpc", (req, res) => {
  if (req.body.type == "started") {
    rpc.setActivity({
      details: "Listening to " + req.body.title,
      state: req.body.author,
      startTimestamp,
      largeImageKey: "default"
    })
  }
  else {
    rpc.setActivity({
      details: "Idling",
      state: "Probably fixing a bug.",
      startTimestamp,
      largeImageKey: "default"
    })
  }

  res.send("ok")
})







let debug = require('debug')('fossic:server')
let http = require('http')
let port = "3001"

let server = http.createServer(app)

server.listen(port);
console.log("Listening")
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}