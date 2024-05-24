import React, { useState, useRef, useEffect } from 'react';

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
        title: "Automatic Sun",
        artist: "The Warning",
        album: "Keep Me Fed",
        url: "../../public/music/automatic-sun.mp3",
        cover: "../../public/cover/keep-me-fed.jpg"
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
        title: "Vía lactea (unplugged",
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
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;

        const setAudioData = () => {
            setDuration(audio!.duration);
            setCurrentTime(audio!.currentTime);
        };

        const setAudioTime = () => setCurrentTime(audio!.currentTime);

        audio?.addEventListener('loadedmetadata', setAudioData);
        audio?.addEventListener('timeupdate', setAudioTime);

        return () => {
            audio?.removeEventListener('loadedmetadata', setAudioData);
            audio?.removeEventListener('timeupdate', setAudioTime);
        };
    }, []);

    useEffect(() => {
        audioRef.current!.volume = volume;
    }, [volume]);

    const playNextTrack = () => {
        setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    };

    const playPreviousTrack = () => {
        setTrackIndex((prevIndex) => {
            if (prevIndex <= 0) {
                return tracks.length - 1;
            }
            return prevIndex - 1;
        });
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
                        <button onClick={playPreviousTrack} style={buttonStyle}>
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
                        <div className='counter'>{formatTime(currentTime)}</div>
                        <input
                            type="range"
                            min="0"
                            max={duration || 1}
                            value={currentTime}
                            onChange={(e) => audioRef.current!.currentTime = parseFloat(e.target.value)}
                            style={{ flexGrow: 1, margin: '0 10px' }}
                        />
                        <div className='counter'    >{formatTime(duration)}</div>
                        <label style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                            <img src="../../public/imgs/volume.png" style={{ width: '20px', height: '20px' }} alt="Volume" />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                style={{ width: '100px' }}
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