import { useEffect, useRef } from "react";

const base = import.meta.env.BASE_URL || "";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(`${base}assets/inspirational-vietnam.mp3`);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const playAudio = () => {
      audio.play().catch(() => { });
      window.removeEventListener("click", playAudio);
    };

    audio.play().catch(() => {
      window.addEventListener("click", playAudio);
    });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return null;
}
