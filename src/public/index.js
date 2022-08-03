const socket = io() // Obtendrémos las funcionalidades del socket del lado del cliente

let click = false // Con esta variable vamos a comprobar cuando le daremos click a la pantalla
let moving_mouse = false // Esta variable me permite comprobar cuando el mouse se mueva en la pantalla
let x_position = 0 // Posicion del mouse en el eje X
let y_position = 0 // Posicion del mouse en el eje Y
let previus_position = null //{x_position: 0, y_position: 0} Guardamos la posición previa del mouse en los 2 ejes
let color = 'black'

const users = document.getElementById('users')

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d') // Contexto en el cual yo voy a trabajar

const width = window.innerWidth // Ancho del navegador
const height = window.innerHeight // Alto del navegador

canvas.width = width // Asignamos el ancho del navegador al canvas (elemento html)
canvas.height = height // Asignamos el alto del navegador al canvas (elemento html)

canvas.addEventListener('mousedown', () => {
    console.log('mousedown: Evento que se acciona al apretar el click')
    click = true
})

canvas.addEventListener('mouseup', () => {
    console.log('mousedown: Evento que se acciona al sacar el click')
    click = false
})

canvas.addEventListener('mousemove', (e) => {
    console.log(e) // mousemove nos devuelve las coordenadas de donde estamos parados: MouseEvent {isTrusted: true, screenX: 492, screenY: 431, clientX: 492, clientY: 328, …}
    x_position = e.clientX
    y_position = e.clientY

    moving_mouse = true
})

//FUNCIÓN CAMBIAR COLOR DE LAS LÍNEAS
const change_color = (c) => {
    color = c // c es el parametro, donde el color se lo damos en el html <button onclick="change_color('red')" />
    context.strokeStyle = color // Acá asignamos el color de arriba al canvas
    context.stroke() // Actualizar los cambios
}

//FUNCIÓN PARA ELIMINAR TODO
const delete_all = () => {
    socket.emit('delete')
}


// Función que nos permite crear un dibujo y también nos permitirá comprobar que si he dado click y si estoy moviendo el mouse
const create_drawing = () => {
    if (click && moving_mouse && previus_position != null) {
        // Objeto que es el dibujo, los atributos o las propiedades del objeto son: x_position = Es el nombre que le damos, el x_position que está en el valor, es el x_position de: x_position = e.clientX, de donde estoy parado, lo mismo con el color: el primer color es solo el nombre de la propiedad del objeto, el segundo color es el valor que estamos obteniendo de arriba, del let color = 'black', Y el valor DEL PREVIUS_POSITION es el que está aca abajo, previus_position = {x_position: x_position, y_position: y_position} este
        let drawing = {
            // Nombre del objeto (pudo haber sido cualquiera): valor que no tiene cualquier nombre, el nombre está dentro de esta hoja
            x_position: x_position,
            y_position: y_position,
            color: color,
            previus_position: previus_position
        }
        // Pasamos el objeto a la función show_drawing
        // show_drawing(drawing)

        // Emitimos el socket y ya dejamos de usar show_drawing(drawing)
        socket.emit('drawing', drawing)
    }
    previus_position = { x_position: x_position, y_position: y_position } // Si no he dibujado aún voy a crear una posicion por defecto o sea, le pasamos una posición inicial

    // La función se ejecuta cuando se aprete el clic y el tiempo de respuesta entre que apretes el clic y comience a dibujar es de 25 milisegundos (al instante)
    setTimeout(create_drawing, 25)
}

// Dejamos de usar show_drawing, ahora debemos usar el socket emitido en el servidor
// const show_drawing = (drawing) => { }
socket.on('show_drawing', (drawing) => {
    if (drawing != null) {
        context.beginPath() // Con esto comenzamos a dibujar el trazo con los datos que le estamos pasando (drawing)
        context.lineWidth = 3 // Con esto definimos el ancho de la línea
        context.strokeStyle = drawing.color // Este es el color de la línea
        context.moveTo(drawing.x_position, drawing.y_position) // En que posicion va a FINALIZAR nuestra línea
        context.lineTo(drawing.previus_position.x_position, drawing.previus_position.y_position) // Cual va a ser la posicion inicial para COMENZAR a dibujar nuestra línea
        context.stroke() // Para dibujar el trazo
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
})

socket.on('users', (number) => {
    users.innerHTML = `Número de usuarios conectados : ${number}` // la cantidad de usuarios no disminuye, solo incrementa, hay que arreglar ese problema
})

// Llamamos a la función y la función se ejecute cada cierto tiempo, con setTimeOut dentro de create_drawing
create_drawing()