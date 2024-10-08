import React, { useEffect, useState } from 'react';

import MedLayout from '../layout/MedLayout';
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from 'react-router-dom';
import { API_URL } from "../auth/constants";
import Axios from 'axios';
import PublishButton from '../components/handlePublish';
//import "@madzadev/audio-player/dist/index.css";
//import Player1 from "./player";
import TemperatureGauge from './TemperatureGauge';
import HumidityGauge from './HumidityGauge';
import "../home.css";
import VideoComponent from './VideoComponent';



export default function Mediciones() {

    
    const auth = useAuth();
    const [data, setData] = useState("");
    const [data2, setData2] = useState("");
    const [data3, setData3] = useState("");
    const [data4, setData4] = useState("");
    const [temInternal, setTemInternal] = useState("");
    const [humInternal, setHumInternal] = useState("");
    const [presInternal, setPresInternal] = useState("");
    const [airQ, setAirQ] = useState("");

    const getMosquitto = async () => {
        try {
            const response = await Axios.get(`${API_URL}/mqtt_manager`);
            const messages = response.data.split(" ");  // Divide la cadena recibida en partes
            // Asumir siempre tres partes según el diseño del sistema
            setData(messages[0]);   // Establece el primer mensaje en el estado data
            setData2(messages[1]);  // Establece el segundo mensaje en el estado data2
            setData3(messages[2]);  // Establece el tercer mensaje en el estado data3
            setData4(messages[3]);  // Establece el cuarto mensaje en el estado data4
            
            console.log(response);
            
        } catch (error) {
            console.error("Error fetching data:", error);
            setData("Null"); // Ajusta los estados en caso de error
            setData2("Null");
            setData3("Null");
            setData4("Null");
        }
    }

    const getInteralSensors = async () => {
        try {
            const response = await Axios.get(`${API_URL}/serial_manager`);
            const messages = response.data.split(" ");  // Divide la cadena recibida en partes
            // Asumir siempre tres partes según el diseño del sistema
            setTemInternal(messages[0]);   // Establece el primer mensaje en el estado data
            setHumInternal(messages[1]);  // Establece el segundo mensaje en el estado data2
            setPresInternal(messages[2]);  // Establece el tercer mensaje en el estado data3
            setAirQ(messages[3]);  // Establece el cuarto mensaje en el estado data4
            
            console.log(response);
            
        } catch (error) {
            console.error("Error fetching data:", error);
            setTemInternal("Null"); // Ajusta los estados en caso de error
            setHumInternal("Null");
            setPresInternal("Null");
            setAirQ("Null");
        }
    }

    const sendMessageToWhatsApp = async () => {
        try {
            const response = await Axios.post(`${API_URL}/whatsappSend`);
            console.log('Mensaje enviado:', response.data);
            alert('Mensaje enviado con éxito!');
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            alert('Error al enviar mensaje');
        }
    };

   /*Comprobar el aire */
   const air = parseFloat(airQ) || 0;

    if (air > 2.5){
         sendMessageToWhatsApp();
    }

    useEffect(() => {
        getMosquitto();
        getInteralSensors();  // Llamar una vez cuando el componente se monta
        const intervalId = setInterval(getMosquitto, 1000);  
        const intervalId2 = setInterval(getInteralSensors, 1000);  // Llamar a la función cada segundo
        return () => {clearInterval(intervalId);
                        clearInterval(intervalId2);
        }  // Limpiar el intervalo cuando el componente se desmonte
    }, []);

    const temperature = parseFloat(data) || 0;
    const humidity = parseFloat(data3) || 0;


    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <MedLayout>
            
        <div className='gauge-container'>    
            <section className="gauge-container temperature-gauge-container">
                    <header><center><h3>Temperatura Exterior</h3></center></header>
                    <center><TemperatureGauge temperature={temperature} /></center>
            </section>
            <section className="gauge-container humidity-gauge-container">
                    <header><center><h3>Humedad Exterior</h3></center></header>
                    <center><HumidityGauge humidity={humidity} /></center>
            </section>
        </div>
        
        <div className='gauge-container'>
        <section className="sensor-section data-container mqtt-container">
            <header><h2>Datos MQTT</h2></header>
            <div className="infodata">Temperatura: <span>{data}</span></div>
            <div className="infodata">Presión: <span>{data2}</span></div>
            <div className="infodata">Humedad: <span>{data3}</span></div>
            <div className="infodata">Calidad del aire: <span>{data4}</span></div>
            
        </section>
        <PublishButton />
        <section className="sensor-section data-container internal-container">
            <header><h2>Sensores Internos</h2></header>
            <div>Temperatura: <span>{temInternal}</span></div>
            <div>Humedad: <span>{humInternal}</span></div>
            <div>Presión: <span>{presInternal}</span></div>
            <div>Calidad del aire: <span>{airQ}</span></div>
        </section>
        
        </div>

        <div>
            <h1>Peer-to-Peer Communication</h1>
            <VideoComponent />
        </div>

       
</MedLayout>     
    );
}