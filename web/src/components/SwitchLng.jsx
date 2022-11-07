import { useTranslation } from "react-i18next";

const lngs = ["en", "fr"];

export default function SwitchLng() {
  const { i18n } = useTranslation();
  return (
    <select
      name="lng"
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      defaultValue={i18n.resolvedLanguage}
    >
      {lngs.map((lng) => (
        <option key={lng} value={lng}>
          {lng}
        </option>
      ))}
    </select>
  );
}
