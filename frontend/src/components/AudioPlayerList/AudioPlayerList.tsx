import React, { useState, useRef, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";

import "./AudioPlayerList.scss";

interface Song {
  name: string;
  url: string;
  albumName: string;
  coverImageUrl?: string;
}

interface AudioPlayerListProps {
  album: {
    albumName: string;
    coverImageUrl: string;
    audio: Song[];
  };
}

const AudioPlayerList: React.FC<AudioPlayerListProps> = ({ album }) => {
  const [currentSong, setCurrentSong] = useState<string>("");
  const [currentName, setCurrentName] = useState<string>("");

  const audioRef = useRef<ReactAudioPlayer>(null);

  const handleSongClick = (audio: Song) => {
    setCurrentName(audio.name);
    setCurrentSong(audio.url);
  };

  useEffect(() => {
    if (audioRef.current?.audioEl.current) {
      audioRef.current.audioEl.current.currentTime = 0;
    }
  }, [currentSong]);

  return (
    <div className="audioPlayerList">
      <h4 className="audioPlayerList-title">{album?.albumName}</h4>

      <img
        className="audioPlayerList-img"
        src={album?.coverImageUrl}
        alt="cover"
      />

      <div className="audioPlayerList-currentSong">{currentName}</div>

      <ReactAudioPlayer
        className="audioPlayerList-player"
        src={currentSong}
        controls
        ref={audioRef}
      />

      <div className="audioPlayerList-container">
        {album?.audio?.map((song, index) => (
          <div
            key={index}
            className={`audioPlayerList-wrapper ${
              currentName === song.name ? "active" : ""
            }`}
            onClick={() => handleSongClick(song)}
          >
            <h4 className="audioPlayerList-wrapper__title">{song.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioPlayerList;
