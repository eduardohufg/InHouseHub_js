const express = require('express');
const router = express.Router();
const { SerialPort } = require('serialport')
const {ReadlineParser} = require('@serialport/parser-readline');

//npm install i2c-bus

// Leer una string enviada por una placa arduino nano vía i2c a una raspberry pi 5 y enviarla al cliente

const i2c = require('i2c-bus');
const i2c1 = i2c.openSync(1);
const address = 0x04;
const cmd = 0x01;
const length = 32;
const buffer = Buffer.alloc(length);

// Leer una string enviada por una placa arduino nano vía i2c a una raspberry pi 5 y enviarla al cliente
router.get('/', (req, res) => {
    i2c1.i2cRead(address, length, buffer, (err, bytesRead, buffer) => {
        if (err) {
            console.error('Error al leer del puerto i2c:', err);
            res.status(500).send('Error al leer del puerto i2c');
        } else {
            console.log('Dato recibido:', buffer.toString('utf8'));
            res.send(buffer.toString('utf8'));
        }
    });
});

module.exports = router;
