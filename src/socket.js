// Exportamos la función con parametro io
module.exports = (io) => {
    console.log('Archivo de sockets')
    let data = []
    let users = 0

    /*  Lo que hacemos ahora es que mediante io, detectar un evento de tipo connection, o sea que nos detecte una nueva conexion de un usuario, entonces nos generará los datos de ese usuario con(socket), entonces vamos a escuchar el evento que me está enviando en cliente(socket) y el nombre del evento es 'drawing' y ademas hay un, (drawing) que son los datos del objeto que le pasamos desde index.js.
    Y con io vamos a emitir un evento llamado 'show_drawing', que le enviaremos el valor que nos está llegando y le pondremos drawing O SEA EN EL FONDO LO QUE HACE ESTE SERVIDOR ES UN EFECTO DE ESPEJO, PORQUE LE ENVIAMOS DATOS Y ESTE SERVIDOR DEVUELVE LOS MISMOS DATOS HACIA TODOS LOS CLIENTES, ES UN HOCICÓN JAJA 
    */
    io.on('connection', (socket) => {
        for (let i = 0; i < data.length; i++) {
            io.emit('show_drawing', data[i])
        }

        users += 1
        io.emit('users', users)

        socket.on('delete', () => {
            data = []
            io.emit('show_drawing', null)
        })
        socket.on('drawing', (drawing) => {
            io.emit('show_drawing', drawing)
            data.push(drawing)
        })

        socket.on('disconnect', () => {
            users -= 1
            io.emit('users', users)
        })
    })
}