import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useTranslation } from "react-i18next";

const SelectProvider = ({ wgPaths, onChange, value }) => {
  const { t } = useTranslation(null, { keyPrefix: "selectProvider" });
  return (
    <FormControl required fullWidth>
      <InputLabel id="wg-path-label">{t("provider")}</InputLabel>
      <Select
        displayEmpty
        id="wg-path"
        labelId="wg-path-label"
        label={t("options")}
        value={value}
        onChange={onChange}
      >
        {wgPaths.map(({ id, firstname, lastname }) => (
          <MenuItem key={id} value={id}>{`${firstname} ${lastname}`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectProvider;
