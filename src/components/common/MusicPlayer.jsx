import { useEffect } from "react";
import { useMusic } from "../../context/MusicContext";

export default function MusicPlayer() {
  const { playMusic } = useMusic();

  useEffect(() => {
    const startMusic = () => {
      playMusic();

      document.removeEventListener("click", startMusic);
      document.removeEventListener("keydown", startMusic);
      document.removeEventListener("touchstart", startMusic);
      document.removeEventListener("scroll", startMusic);
    };

    document.addEventListener("click", startMusic);
    document.addEventListener("keydown", startMusic);
    document.addEventListener("touchstart", startMusic);
    document.addEventListener("scroll", startMusic);

    return () => {
      document.removeEventListener("click", startMusic);
      document.removeEventListener("keydown", startMusic);
      document.removeEventListener("touchstart", startMusic);
      document.removeEventListener("scroll", startMusic);
    };
  }, []);

  return null;
}
