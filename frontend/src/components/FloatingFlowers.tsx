import { useEffect, useRef } from "react";
import "../styles/invitation.css";

export default function FloatingFlowers() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const botanicals = {
      petal: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8 2 5 8 5 12C5 16 8 22 12 22C16 22 19 16 19 12C19 8 16 2 12 2Z" fill="#D4AF37" opacity="0.7"/></svg>`,
      blossom: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="#8B1538" opacity="0.6"/><circle cx="12" cy="12" r="4" fill="#D4AF37" opacity="0.8"/></svg>`,
      leaf: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L20 12L12 22L4 12Z" fill="#9CAF88" opacity="0.7"/></svg>`,
    };

    const layers = ["background", "midground", "foreground"];

    for (let i = 0; i < 15; i++) {
      const type = Object.keys(botanicals)[Math.floor(Math.random() * 3)];
      const layer = layers[Math.floor(Math.random() * 3)];
      const el = document.createElement("div");
      el.className = `botanical ${type} ${layer}`;
      el.innerHTML = botanicals[type as keyof typeof botanicals];
      el.style.left = Math.random() * 100 + "%";

      // Random starting Y offset for immediate movement
      el.style.top = Math.random() * 50 + "vh";

      // Random delay (some start right away)
      // el.style.animationDelay = Math.random() < 0.4 ? "0s" : Math.random() * 15 + "s";
      el.style.animationDuration = 15 + Math.random() * 10 + "s";
      container.appendChild(el);
    }

    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "botanical sparkle";
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.animationDelay = Math.random() * 25 + "s";
      sparkle.style.animationDuration = 20 + Math.random() * 8 + "s";
      container.appendChild(sparkle);
    }
  }, []);

  return <div className="floating-flowers" ref={ref} />;
}
