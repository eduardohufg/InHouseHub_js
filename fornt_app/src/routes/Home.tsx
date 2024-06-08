import React, { useEffect, useState } from 'react';

import DefaultHome from "../layout/DefaultHome";
//import "@madzadev/audio-player/dist/index.css";
//import Player1 from "./player";
import MusicPlayer from './musicPlayer';
import "../home.css";

export default function Home() {

    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const showTime = date.getHours()
                + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            setCurrentTime(showTime);
        }, 1000);  // Se actualiza cada 1000 milisegundos (1 segundo)

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);

    return (
        <DefaultHome>
            <div className="home-container">
                <div>
                    <section className="music-container">
                        <h1 className="time">{currentTime}</h1>
                        <MusicPlayer />
                    </section>
                </div>
            </div>
        </DefaultHome>
    );
}