const router = require('express').Router();
const mqtt = require('mqtt');
const Temperature = require('../schema/temperature');

// Crear una instancia única de cliente MQTT que será utilizada en todo el router
const client = mqtt.connect('mqtt://localhost:1883');

let lastMessage = "No data received";
let lastMessage2 = "No data received";
let lastMessage3 = "No data received";
let lastTemperature = null;

client.on("connect", () => {
    console.log("Connected to MQTT broker");
    // Suscribirse a todos los temas necesarios aquí si es posible
    client.subscribe(["temperature", "prueba", "prueba2"], (err, granted) => {
        if (err) {
            console.log("Failed to subscribe:", err.message);
        } else {
            console.log("Subscribed to topics:", granted.map(sub => sub.topic).join(", "));
        }
    });
});

client.on("message", (topic, message) => {
    console.log(`Received message from ${topic}:`, message.toString());
    switch (topic) {
        case "temperature":
            lastMessage = message.toString();
            lastTemperature = parseFloat(message.toString());
            break;
        case "prueba":
            lastMessage2 = message.toString();
            break;
        case "prueba2":
            lastMessage3 = message.toString();
            break;
    }
});

client.on("error", (error) => {
    console.error("Connection error:", error);
});

router.get('/', (req, res) => {
    res.send(lastMessage + " " + lastMessage2 + " " + lastMessage3);
});

router.post('/', (req, res) => {
    const { message } = req.body; // Recibe el mensaje del cuerpo de la solicitud
    if (message) {
        client.publish('respuesta', message, (err) => {
            if (err) {
                console.error("Publish error:", err);
                return res.status(500).send("Failed to publish message");
            }
            res.send("Message published successfully");
        });
    } else {
        res.status(400).send("No message provided");
    }
});

function saveTemperature() {
    if (lastTemperature !== null) {
        const temperatureData = new Temperature({
            value: lastTemperature
        });
        temperatureData.save()
            .then(() => console.log("Temperature data saved successfully"))
            .catch(err => console.error("Error saving temperature data:", err));
    } else {
        console.log("No temperature data to save");
    }
}
setInterval(saveTemperature, 300000);
module.exports = router;
