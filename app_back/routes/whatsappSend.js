// routes/whatsappSend.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

const sendMessage = async (req, res) => {
  const messageData = {
    messaging_product: "whatsapp",
    to: "525625887437",  // Número de teléfono del destinatario
    type: "template",
    template: {
      name: "inhouse",  // Nombre de la plantilla registrada en WhatsApp
      language: {
        code: "es_MX"  // Código de idioma de la plantilla
      }
    }
  };

  try {
    const response = await axios({
      method: 'post',
      url: 'https://graph.facebook.com/v19.0/303551362850001/messages',
      headers: {
        'Authorization': `Bearer EAAGpckqPfZCMBO5YnkCXkrbfFgGzMnvuI6aCYMgV2eFszAcUADCWseZA1nYZC9pyxx1ZB5DZCw3qG0iZCuHlI5N5VJId6ge3keOgjm0mSDEyFTwsyOwk6vzZANQj3EbEAYmJ28iS2WQ8kOx7YYMHymJslHHFafcyW3UxMGciU2ohzFtyf62gAbGZCsagQjs7FEmPQDZBTFMxeKsGeYBU3mWAZD`,  // Token de acceso
        'Content-Type': 'application/json'
      },
      data: messageData
    });

    res.status(200).json({
      success: true,
      data: response.data
    });
  } catch (error) {
    if (error.response) {
        console.error('Error al enviar mensaje:', error.response.data);
        res.status(error.response.status).json({
            success: false,
            error: error.response.data
        });
    } else if (error.request) {
        console.error('Error al enviar mensaje:', error.message);
        res.status(500).json({
            success: false,
            error: "No se recibió respuesta del servidor"
        });
    } else {
        console.error('Error al enviar mensaje:', error.message);
        res.status(500).json({
            success: false,
            error: "Error al configurar la solicitud"
        });
    }
  }
};

router.post('/', sendMessage);

module.exports = router;
