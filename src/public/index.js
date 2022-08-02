const socket = io() // Obtendrémos las funcionalidades del socket del lado del cliente

let click = false // Con esta variable vamos a comprobar cuando le daremos click a la pantalla
let moving_mouse = false // Esta variable me permite comprobar cuando el mouse se mueva en la pantalla
let x_position = 0 // Posicion del mouse en el eje X
let y_position = 0 // Posicion del mouse en el eje Y
let previus_position = null //{x_position: 0, y_position: 0} Guardamos la posición previa del mouse en los 2 ejes
let color = 'black'

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

// Función que nos permite crear un dibujo y también nos permitirá comprobar que si he dado click y si estoy moviendo el mouse
const create_drawing = () => {
    if(click && moving_mouse && previus_position != null){
        // Objeto que es el dibujo
        let drawing = {
            x_position: x_position,
            y_position: y_position,
            color: color,
            previus_position: previus_position
        }
        show_drawing(drawing)
    }
    previus_position = {x_position: x_position, y_position: y_position} // Si no he dibujado aún voy a crear una posicion por defecto o sea, le pasamos una posición inicial

    setTimeout(create_drawing, 25)
}

const show_drawing = (drawing) => {
    context.beginPath()
    context.lineWidth = 3
    context.strokeStyle = drawing.color
    context.moveTo(drawing.x_position, drawing.y_position)
    context.lineTo(drawing.previus_position.x_position, drawing.previus_position.y_position)
    context.stroke()
}

create_drawing()