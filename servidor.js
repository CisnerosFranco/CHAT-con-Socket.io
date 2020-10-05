const express = require("express")
const exphbs = require("express-handlebars")
const socketio = require('socket.io')
const operacionesDB = require("./batabase/operacionesDB")

//nos conectamos a la base de datos
const { conectar, saveMessage, getMessages } = require('./batabase/operacionesDB');
const conexion = require("./batabase/conexion");



//SERVER AND ENGINS LAYOUTS
const app = express()
const motor = exphbs.create({
    defaultLayout: "layout",
    extname: ".hbs"
})

app.engine(".hbs", motor.engine)
app.set("view engine", ".hbs")

//directory static
app.use(express.static(__dirname + '/public'));

// ROUTERS
app.get("/", (req, res) => {
    res.render("mensajes")
})





//web socket creado
conectar((error) => {
    if (error) {
        console.log('NO SE PUDO CONECTAR A LA BASE DE DATOS');
    }
    else {
        const server = app.listen(8080, _ => console.log('app it´s in http://localhost:8080'));
        const io = socketio(server);

        //escuchamos nuevas conexiones
        io.on('connection', (socket) => {
            console.log('it´s connected new client with id ' + socket.id);
            getMessages((error, data) => {
                if (error) {
                    io.sockets.emit('mensajeSaliente', {
                        status: 404
                    })
                    console.log(error);
                } else {
                    io.sockets.emit('mensajeSaliente', {
                        status: 200,
                        messages: data
                    })
                }
            })
            
            //eschan los sockets
            socket.on('mensajesEntrantes', message => {
                console.log(message)
                saveMessage(message, (error, data) => {
                    if (error) {
                        io.sockets.emit('mensajeSaliente', {
                            status: 404
                        })
                        console.log(error);
                    } else {
                        io.sockets.emit('mensajeSaliente', {
                            status: 200,
                            messages: data
                        })
                    }
                })
            })
        })
    }
})







