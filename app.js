
// Main starting point

'use strict'

require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const hbs = require('express-hbs')
const websocket = require('ws')
const cors = require('cors')
const https = require('https')
const fs = require('fs')

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/rootRouter'))
app.use('/model', require('./routes/modelRouter'))
app.use('/properties', require('./routes/propertiesRouter'))
app.use('/actions', require('./routes/actionsRouter'))

// Uncaught 404's
app.use((req, res, next) => {
  res.status(404)
  res.json({ message: '404 - resource not found' })
})

// Uncaught server errors
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ message: err.message || 'Internal Server Error' })
})

const server = app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}!`)
)

// optional self signed https server
https.createServer({
  key: fs.readFileSync('./cert/abels-key.pem'),
  cert: fs.readFileSync('./cert/abels-cert.pem')
}, app)
  .listen(8000)

// Websockets
const sensor = require('./plugins/SenseHAT.js')
const messageResource = require('./resources/actions')
const wss = new websocket.Server({ server })
app.on('upgrade', wss.handleUpgrade)

wss.on('connection', function connection (ws) {
  console.log('new ws connection')
  ws.on('message', function incoming (message) {
  })
})

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === websocket.OPEN) {
      client.send(data)
    }
  })
}

setInterval(async () => {
  wss.broadcast(JSON.stringify({
    temp: await sensor.readTempAsync(),
    humi: await sensor.readHumidityAsync(),
    press: await sensor.readPressureAsync(),
    message: messageResource.actionData.resources.ledMessage.data[0].message,
    timestamp: new Date().toJSON()
  }))
}, 3000)

module.exports.broadcast = wss.broadcast
