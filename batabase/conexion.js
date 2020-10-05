const mongoose  = require('mongoose');
const urlDB = 'mongodb://127.0.0.1:27017/Messages'


//lo correcto seria usar una callback para informar de errores
function conectar(callback) {
    mongoose.connect(urlDB, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.once('open', () => {
        console.log('conectados a la base de datos Messages');
        callback(null);
    })

    mongoose.connection.on('error', (error)=> {
        callback(error);
    })
}


module.exports = {
    conectar
}


//y listo para importar








