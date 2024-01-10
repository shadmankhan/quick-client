import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
function LanguageSwitcher({ changeLanguage }) {
  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fr")}>French</button>
    </div>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    // Update the currentLanguage state whenever the language changes
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = async (lng) => {
    // Call the backend API to fetch translations for the selected language
    const response = await fetch(
      `http://localhost:5000/api/translations/${lng}`
    );
    const data = await response.json();

    // Update i18n language and resources with the fetched translations
    i18n.changeLanguage(lng);
    i18n.addResourceBundle(lng, "translation", data, true);
  };

  return (
    <div>
      Currently Selected: {currentLanguage}
      <LanguageSwitcher changeLanguage={changeLanguage} />
      <h1>{t("greeting")}</h1>
    </div>
  );
}

export default App;
