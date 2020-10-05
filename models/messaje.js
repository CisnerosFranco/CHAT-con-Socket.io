const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    contenido : {
        type: String,
        required: true
    }
})

module.exports = model('message', messageSchema);














