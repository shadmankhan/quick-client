import { createRoot } from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import App from "./App";

i18n
  .use(Backend) // Use the HTTP backend
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "http://localhost:5000/api/translations/{{lng}}", // Backend endpoint to fetch translations
    },
    fallbackLng: "en", // Default language
    debug: true, // Enable debug mode
    interpolation: {
      escapeValue: false, // React already safely escapes strings
    },
  });

// append app to dom
const root = createRoot(document.getElementById("root"));
root.render(<App />);
