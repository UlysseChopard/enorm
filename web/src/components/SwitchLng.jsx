import { useTranslation } from "react-i18next";

export default function SwitchLng() {
  const { i18n } = useTranslation();
  return (
    <label>
      select your language
      <select name="lng">
        {i18n.languages.map((lng) => (
          <option
            key={lng}
            value={lng}
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lng}
          </option>
        ))}
      </select>
    </label>
  );
}
