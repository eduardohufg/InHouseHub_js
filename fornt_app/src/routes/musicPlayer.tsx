import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

// Lista de canciones
const tracks = [
    {
        title: "Z",
        artist: "The Warning",
        album: "Error",
        url: "../../public/music/z.mp3",
        cover: "../../public/cover/error.jpg"
    },
    {
        title: "MORE",
        artist: "The Warning",
        album: "MORE",
        url: "../../public/music/more.mp3",
        cover: "../../public/cover/more.jpg"
    },
    {
        title: "Love S.O.S. (WWW)",
        artist: "Justice",
        album: "Woman Worldwide",
        url: "../../public/music/love-sos-www.mp3",
        cover: "../../public/cover/www.jpg"
    },
    {
        title: "This Love",
        artist: "Maroon 5",
        album: "Songs About Jane",
        url: "../../public/music/this-love.mp3",
        cover: "../../public/cover/songs-about-jane.jpg"
    },
    {
        title: "Pressure",
        artist: "Muse",
        album: "Simulation Theory",
        url: "../../public/music/pressure.mp3",
        cover: "../../public/cover/simulation-theory.jpg"
    },
    {
        title: "Sugar",
        artist: "Maroon 5",
        album: "V",
        url: "../../public/music/sugar.mp3",
        cover: "../../public/cover/v.jpg"
    },
    {
        title: "One More Time",
        artist: "Daft Punk",
        album: "Discovery",
        url: "../../public/music/one-more-time.mp3",
        cover: "../../public/cover/discovery.jpg"
    },
    {
        title: "Run to the Hills",
        artist: "Iron Maiden",
        album: "The Number of the Beast",
        url: "../../public/music/run-to-the-hills.mp3",
        cover: "../../public/cover/the-number-of-the-beast.jpg"
    },
    {
        title: "Bellacoso",
        artist: "Residente, Bad Bunny",
        album: "Bellacoso",
        url: "../../public/music/bellacoso.mp3",
        cover: "../../public/cover/bellacoso.jpg"
    },
    {
        title: "La Dificil",
        artist: "Bad Bunny",
        album: "YHLQMDLG",
        url: "../../public/music/la-dificil.mp3",
        cover: "../../public/cover/yhlqmdlg.jpg"
    },
    {
        title: "KOOL AID KIDS",
        artist: "The Warning",
        album: "Error",
        url: "../../public/music/kool-aid-kids.mp3",
        cover: "../../public/cover/error.jpg"
    },
    {
        title: "Teddy Picker",
        artist: "Arctic Monkeys",
        album: "Favourite Worst Nightmare",
        url: "../../public/music/teddy-picker.mp3",
        cover: "../../public/cover/worst-nightmare.jpg"
    },
    {
        title: "Back in Black (Live)",
        artist: "AC/DC",
        album: "Live",
        url: "../../public/music/back-in-black-live.mp3",
        cover: "../../public/cover/live.jpg"
    },
    {
        title: "You Only Live Once",
        artist: "The Strokes",
        album: "First Impressions of Earth",
        url: "../../public/music/you-only-live-once.mp3",
        cover: "../../public/cover/first-impressions-of-earth.jpg"
    },
    {
        title: "Aces High",
        artist: "Iron Maiden",
        album: "Powerslave",
        url: "../../public/music/aces-high.mp3",
        cover: "../../public/cover/powerslave.jpg"
    },
    {
        title: "Cómo es posible que a mi lado",
        artist: "Luis Miguel",
        album: "Nada es igual",
        url: "../../public/music/como-es-posible-que-a-mi-lado.mp3",
        cover: "../../public/cover/nada-es-igual.jpg"
    },
    {
        title: "La chica del bikini azul",
        artist: "Luis Miguel",
        album: "Palabra de honor",
        url: "../../public/music/bikini-azul.mp3",
        cover: "../../public/cover/palabra-de-honor.jpg"
    },
    {
        title: "Locos",
        artist: "León Larregui",
        album: "Voluma",
        url: "../../public/music/locos.mp3",
        cover: "../../public/cover/voluma.jpg"
    },
    {
        title: "Poli Love (unplugged)",
        artist: "Zoé",
        album: "Música de fondo (unplugged)",
        url: "../../public/music/poli-love.mp3",
        cover: "../../public/cover/musica-de-fondo.jpg"
    },
    {
        title: "Vía lactea (unplugged)",
        artist: "Zoé",
        album: "Música de fondo (unplugged)",
        url: "../../public/music/via-lactea.mp3",
        cover: "../../public/cover/musica-de-fondo.jpg"
    },
    {
        title: "Azul",
        artist: "Zoé",
        album: "Aztlán",
        url: "../../public/music/azul.mp3",
        cover: "../../public/cover/aztlan.jpg"
    }
];

const MusicPlayer: React.FC = () => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Esta función asegura que cuando el trackIndex cambia, la nueva canción comience a reproducirse
        // si el estado isPlaying es true.
        const playAudio = async () => {
            if (audioRef.current) {
                if (isPlaying) {
                    await audioRef.current.play();
                } else {
                    audioRef.current.pause();
                }
            }
        };

        playAudio();

        // Establecer los metadatos iniciales para la nueva pista
        const setAudioData = () => {
            if (audioRef.current) {
                setDuration(audioRef.current.duration);
                setCurrentTime(audioRef.current.currentTime);
            }
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('loadedmetadata', setAudioData);
        }

        // Limpieza: eliminar el listener cuando el componente se desmonte o el trackIndex cambie
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('loadedmetadata', setAudioData);
            }
        };
    }, [trackIndex, isPlaying]); // Añade trackIndex a las dependencias

    useEffect(() => {
        const setAudioTime = () => {
            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
            }
        };

        const audio = audioRef.current;
        audio?.addEventListener('timeupdate', setAudioTime);

        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', setAudioTime);
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handleBackward = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            if (currentTime >= 2) {
                // Si la canción lleva más de 2 segundos, la reinicia a 0:00
                audioRef.current.currentTime = 0;
            } else {
                // Si la canción lleva menos de 2 segundos, va a la canción anterior
                playPreviousTrack();
            }
        }
    };
    

    const playNextTrack = () => {
        if (isShuffle) {
            // Selecciona un índice al azar
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * tracks.length);
            } while (randomIndex === trackIndex);
            setTrackIndex(randomIndex);
        } else {
            // Siguiente canción de manera secuencial
            setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
        }
    };

    const playPreviousTrack = () => {
        if (isShuffle) {
            // Selecciona un índice al azar para la canción anterior
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * tracks.length);
            } while (randomIndex === trackIndex);
            setTrackIndex(randomIndex);
        } else {
            // Canción anterior de manera secuencial
            setTrackIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : tracks.length - 1);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const buttonStyle = {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '10px'
    };


    return (
        

        <div>
            
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div>
        <div className="track-list">
                {tracks.map((track, index) => (
                    <div key={index} className="track-item" onClick={() => setTrackIndex(index)}>
                        <img src={track.cover} alt={track.title} style={{ width: '100px', height: '100px' }} />
                        <div className="track-info">
                            <div className="track-title">{track.title}</div>
                            <div className="track-artist">{track.artist}</div>
                        </div>
                    </div>
                ))}
                </div>

            </div>
            <img 
                src={tracks[trackIndex].cover} 
                alt={tracks[trackIndex].title} 
                style={{ width: '200px', height: '200px', borderRadius: 15 }} 
            />
            <div>
                <audio src={tracks[trackIndex].url} ref={audioRef} onEnded={playNextTrack} />
                <div>
                    <div className="centered-text" style={{fontSize: 25, fontWeight: 'bold'}}>{tracks[trackIndex].title}</div>
                    <div className="centered-text" style={{fontSize: 17, fontWeight: 'bold'}}>{tracks[trackIndex].artist}</div>
                    <div className="centered-text">{tracks[trackIndex].album}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div>
                    <audio src={tracks[trackIndex].url} ref={audioRef} onEnded={playNextTrack} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                            
                            <button onClick={() => setIsShuffle(!isShuffle)} style={buttonStyle}>
                                <img src={isShuffle ? "../../public/imgs/shuffle_button_true.png" : "../../public/imgs/shuffle_button_false.png"} style={{ width: '25px', height: '25px' }} alt="Shuffle" />
                            </button>
                            <button onClick={handleBackward} style={buttonStyle}>
                                <img src="../../public/imgs/prev_button.png" style={{ width: '20px', height: '20px' }} alt="Previous" />
                            </button>
                            <button onClick={() => setIsPlaying(!isPlaying)} style={buttonStyle}>
                                <img src={isPlaying ? "../../public/imgs/stop_button.png" : "../../public/imgs/play_button.png"} style={{ width: '20px', height: '20px' }} alt="Play/Pause" />
                            </button>
                            <button onClick={playNextTrack} style={buttonStyle}>
                                <img src="../../public/imgs/next_button.png" style={{ width: '20px', height: '20px' }} alt="Next" />
                            </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <div className='time-container'>{formatTime(currentTime)}</div>
                            <input
                                type="range"
                                min="0"
                                max={duration || 1}
                                value={currentTime}
                                onChange={(e) => audioRef.current!.currentTime = parseFloat(e.target.value)}
                                style={{ flexGrow: 1, margin: '0 10px', cursor: 'pointer'}}
                            />
                            <div className='time-container'    >{formatTime(duration)}</div>
                            <label style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                <img src="../../public/imgs/volume.png" style={{ width: '20px', height: '20px' }} alt="Volume" />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    style={{ width: '100px', color: 'transparent', cursor: 'pointer'}}
                                />                                    
                            </label>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    );
};

export default MusicPlayer;