// Importando módulos que vamos a necesitar
const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express() // Creando servidor usando express
const server = http.createServer(app) // Creando servidor con http, ya que socketio utiliza http

// importamos módulo socket.js
const io = socketio(server) // Segundo escribimos esto
require('./socket.js')(io) // Primero escribimos esto

// Configuración de servidor
app.set('port', 3000) // port = 3000
app.use(express.static(path.join(__dirname, 'public'))) // Utilizando middleware express.static o sea, requiere una ruta de la carpeta estatica

server.listen(app.get('port'), () => {
    console.log(`App corriendo en el puerto: ${app.get('port')}`)
})