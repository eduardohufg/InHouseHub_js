const express = require('express');
const { SerialPort } = require('serialport')
const {ReadlineParser} = require('@serialport/parser-readline');
const router = express.Router();

const port = new SerialPort({
    path: 'COM17',
    baudRate: 9600
}, function (err) {
    if (err) {
        return console.log('Error: ', err.message);
    }
});

//const port = new SerialPort('COM17', { baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Ruta para obtener datos del puerto serial
router.get('/', (req, res) => {
  parser.once('data', (data) => {
    console.log('Dato recibido:', data);
    res.send(data);
  });

  parser.on('error', (err) => {
    console.error('Error al leer del puerto serial:', err);
    res.status(500).send('Error al leer del puerto serial');
  });
});

module.exports = router;
