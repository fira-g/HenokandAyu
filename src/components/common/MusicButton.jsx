import { useMusic } from "../../context/MusicContext";

export default function MusicButton() {
  const { isPlaying, isMuted, playMusic, pauseMusic, toggleMute, setVolume } =
    useMusic();

  return (
    <div>
      <button
        className="text-lg"
        onClick={() => (isPlaying ? pauseMusic() : playMusic())}
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>

      {/* <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button> */}

      {/* <input
        type="range"
        size={100}
        min="0"
        max="1"
        step="0.1"
        defaultValue="0.3"
        onChange={(e) => setVolume(Number(e.target.value))}
      />
      <p>🔊</p> */}
    </div>
  );
}
