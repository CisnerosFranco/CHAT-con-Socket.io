const conexion = require('./conexion');
const Message = require('../models/messaje');
const messaje = require('../models/messaje');


function conectar(callback) {
    conexion.conectar(callback);
}

function saveMessage(objMessage, callback) {
    new Message({
        origen: objMessage.origen,
        destino: objMessage.destino,
        contenido: objMessage.contenido
    })
    .save((error, document)=> {
        if(error){
            callback(error, null)
        }
        else{
            Message.find(callback)
        }
    });    
}

function getMessages(callback){
    Message.find(callback);
}


module.exports = {
    conectar,
    saveMessage,
    getMessages
}
















