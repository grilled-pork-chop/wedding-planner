import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "fr").split("-")[0] as "fr" | "vi";

  return (
    <div className="language-toggle">
      {(["fr", "vi"] as const).map((l) => (
        <button
          key={l}
          className={`lang-btn ${lang === l ? "active" : ""}`}
          onClick={() => i18n.changeLanguage(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
