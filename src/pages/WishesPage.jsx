import { PageHeader, BackToHome } from "@/components/common";
import { WishForm, AudioRecorder, WishesFeed } from "@/components/wishes";
import { useMusic } from "../context/MusicContext";
import { useEffect } from "react";

export default function WishesPage() {
  const { pauseMusic, playMusic } = useMusic();
  useEffect(() => {
    pauseMusic();
    return () => {
      playMusic();
    };
  }, []);
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Wishes"
        subtitle="Words from the heart"
        gradientClass="bg-purple-gradient"
        ornamentColor="text-purple-300"
        textColor="text-purple-100"
        subColor="text-purple-300"
      />
      <div className="px-6 py-8">
        <WishForm />
        <AudioRecorder />
        <WishesFeed />
      </div>
      <BackToHome />
    </div>
  );
}
