import { useMusic } from "../../context/MusicContext";
import { Play, Pause, Volume2, VolumeX, PlayCircle } from "lucide-react";

export default function MusicButton() {
  const { isPlaying, isMuted, playMusic, pauseMusic, toggleMute, setVolume } =
    useMusic();

  return (
    <button
      className="text-lg"
      onClick={() => (isPlaying ? pauseMusic() : playMusic())}
    >
      {isPlaying ? (
        <Pause size={24} className="text-gold-400" />
      ) : (
        <PlayCircle size={24} className="text-gold-400" />
      )}
    </button>
  );
}
