import React, { useEffect, useState } from 'react';

import DefaultHome from "../layout/DefaultHome";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from 'react-router-dom';
import { API_URL } from "../auth/constants";
import Axios from 'axios';
import PublishButton from '../components/handlePublish';


export default function Home() {

    
    const auth = useAuth();
    const [data, setData] = useState("");
    const [data2, setData2] = useState("");
    const [data3, setData3] = useState("");

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

    useEffect(() => {
        getMosquitto();  // Llamar una vez cuando el componente se monta
        const intervalId = setInterval(getMosquitto, 1000);  // Llamar cada 5000 ms (5 segundos)

        return () => clearInterval(intervalId);  // Limpiar el intervalo cuando el componente se desmonte
    }, []);

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <DefaultHome>
            <h1>Aquí debe de ir toda la información y documentación del proyecto</h1>
            <div>{data}</div>
            <div>{data2}</div>
            <div>{data3}</div>
            <h2>Publicar en MQTT</h2>
            <PublishButton />
           
        </DefaultHome>
    );
}