import React, { useEffect, useState } from 'react';

import DefaultHome from "../layout/DefaultHome";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from 'react-router-dom';
import { API_URL } from "../auth/constants";
import Axios from 'axios';
import PublishButton from '../components/handlePublish';
//import "@madzadev/audio-player/dist/index.css";
import Player1 from "./player";
import MusicPlayer from './musicPlayer';
import "../home.css";



export default function Home() {

    
    const auth = useAuth();
    const [data, setData] = useState("");
    const [data2, setData2] = useState("");
    const [data3, setData3] = useState("");
    const [data4, setData4] = useState("");
    const [temInternal, setTemInternal] = useState("");
    const [humInternal, setHumInternal] = useState("");
    const [presInternal, setPresInternal] = useState("");


    const getMosquitto = async () => {
        try {
            const response = await Axios.get(`${API_URL}/mqtt_manager`);
            const messages = response.data.split(" ");  // Divide la cadena recibida en partes
            // Asumir siempre tres partes según el diseño del sistema
            setData(messages[0]);   // Establece el primer mensaje en el estado data
            setData2(messages[1]);  // Establece el segundo mensaje en el estado data2
            setData3(messages[2]);  // Establece el tercer mensaje en el estado data3
            
            console.log(response);
            
        } catch (error) {
            console.error("Error fetching data:", error);
            setData("Error fetching data"); // Ajusta los estados en caso de error
            setData2("Error fetching data");
            setData3("Error fetching data");
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
            
            console.log(response);
            
        } catch (error) {
            console.error("Error fetching data:", error);
            setTemInternal("Error fetching data"); // Ajusta los estados en caso de error
            setHumInternal("Error fetching data");
            setPresInternal("Error fetching data");
        }
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

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <DefaultHome>
    <div className="home-container">
        <section className="sensor-section">
            <header><h2>Datos MQTT</h2></header>
            <div className="infodata">Temperature: <span>{data}</span></div>
            <div className="infodata">Pressure: <span>{data2}</span></div>
            <div className="infodata">Humidity: <span>{data3}</span></div>
            <PublishButton />
        </section>

        <section className="sensor-section">
            <header><h2>Sensores Internos</h2></header>
            <div>Temperature: <span>{temInternal}</span></div>
            <div>Humidity: <span>{humInternal}</span></div>
            <div>Pressure: <span>{presInternal}</span></div>
        </section>

        <div>
            <MusicPlayer />
        </div>
    </div>
</DefaultHome>

        
        
    );
}