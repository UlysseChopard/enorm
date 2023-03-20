import { useTranslation } from "react-i18next";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function GenderRadioGroup() {
  const { t } = useTranslation(null, { keyPrefix: "genderRadio" });
  return (
    <FormControl>
     <FormLabel id="gender">{t("gender")}</FormLabel> 
      <RadioGroup
        aria-labelledby="gender"
        defaultValue="male"
        name="gender"
      >
        <FormControlLabel value="male" control={<Radio />} label={t("male")} />
        <FormControlLabel value="female" control={<Radio />} label={t("female")} />
      </RadioGroup>
    </FormControl>
  );
}
