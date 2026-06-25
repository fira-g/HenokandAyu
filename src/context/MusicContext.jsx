import { createContext, useContext, useEffect, useRef, useState } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const playMusic = async () => {
    try {
      await audioRef.current?.play();
      setIsPlaying(true);
    } catch (err) {
      console.log(err);
    }
  };

  const pauseMusic = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    audio.muted = !audio.muted;

    setIsMuted(audio.muted);
  };

  const setVolume = (value) => {
    audioRef.current.volume = value;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);
  return (
    <MusicContext.Provider
      value={{
        playMusic,
        pauseMusic,
        toggleMute,
        setVolume,
        isPlaying,
        isMuted,
      }}
    >
      <audio ref={audioRef} loop>
        <source src="/audio/song.m4a" type="audio/mpeg" />
      </audio>

      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
