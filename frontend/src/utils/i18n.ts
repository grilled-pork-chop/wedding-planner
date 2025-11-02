import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

const base = import.meta.env.BASE_URL || "/";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "fr",
    supportedLngs: ["fr", "vi"],
    backend: { loadPath: `${base}locales/{{lng}}.json` },
  });

export default i18n;
