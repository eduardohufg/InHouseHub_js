import React, { useEffect, useState } from 'react';

import DefaultHome from "../layout/DefaultHome";
import { API_URL } from "../auth/constants";
import Axios from 'axios';
//import "@madzadev/audio-player/dist/index.css";
//import Player1 from "./player";
import MusicPlayer from './musicPlayer';
import "../home.css";



export default function Home() {


    function time () {
        const date = new Date();
        const showTime = date.getHours() 
        /*Mostrar 2 números en caso de que los minutos sean de un solo dígito*/
        + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        return showTime;
    }

    return (
        <DefaultHome>
            
    <div className="home-container">
        <div>
            <h1 className="time">{time()}</h1>
            
            <section className="music-container">
            <MusicPlayer />
            </section>
        </div>
    </div>
</DefaultHome>     
    );
}