import React, { useState } from "react";
import Player from "@madzadev/audio-player";

const tracks = [
    {
        url: "../../public/more.mp3",
        title: "MORE - The Warning",
        tags: ["rock"],
        cover: "../../public/more.jpg",
    },
    {
        url: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
        title: "Madza - Late Night Drive",
        tags: ["dnb"],
        cover: "../../public/los.jpg",
    },
    {
        url: "https://audioplayer.madza.dev/Madza-Persistence.mp3",
        title: "Madza - Persistence",
        tags: ["dubstep"],
        cover: "../../public/more.jpg",
    },
];

const Player1 = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Clave única para la imagen basada en la portada y el título de la canción
  const imageKey = `${tracks[currentTrackIndex].title}-${tracks[currentTrackIndex].cover}`;

  return (
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img key={imageKey}
               src={tracks[currentTrackIndex].cover} 
               alt="Cover" 
               style={{ width: "300px", height: "300px" }} />
          <div>
              <Player 
                  trackList={tracks}
                  onTrackChange={(index) => {
                      console.log("Track changed to:", index);
                      setCurrentTrackIndex(index);
                  }}
              />
          </div>
      </div>
  );
};

export default Player1;


