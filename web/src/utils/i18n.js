import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    load: "languageOnly",
    cleanCode: true,
    fallbackLng: "en",
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
