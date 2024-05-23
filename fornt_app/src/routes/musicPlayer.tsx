import React, { useState, useRef, useEffect } from 'react';

// Lista de canciones
const tracks = [
    {
        title: "More",
        url: "../../public/music/more.mp3",
        cover: "../../public/cover/more.jpg"
    },
    {
        title: "Canción 2",
        url: "/music/song2.mp3",
        cover: "../../public/cover/los.jpg"
    },
    {
        title: "Canción 3",
        url: "/music/song3.mp3",
        cover: "../../public/cover/los.jpg"
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

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={tracks[trackIndex].cover} alt={tracks[trackIndex].title} style={{ width: '200px', height: '200px' }} />
                <div>
                    <audio src={tracks[trackIndex].url} ref={audioRef} onEnded={playNextTrack} />
                    <div>
                        <button onClick={playPreviousTrack}>Previous</button>
                        <button onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button onClick={playNextTrack}>Next</button>
                    </div>
                    <div>
                        <label>
                            Volume:
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                            />
                        </label>
                    </div>
                    <div>
                        <input
                            type="range"
                            min="0"
                            max={duration || 1}
                            value={currentTime}
                            onChange={(e) => audioRef.current!.currentTime = parseFloat(e.target.value)}
                            style={{ width: '100%' }}
                        />
                        <div>{formatTime(currentTime)}/{formatTime(duration)}</div>
                    </div>
                    <div>Now Playing: {tracks[trackIndex].title}</div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;

