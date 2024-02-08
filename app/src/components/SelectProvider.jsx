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
        disabled={wgPaths.length <= 1}
      >
        {wgPaths.map(({ id, organisation_name }) => (
          <MenuItem key={id} value={id}>
            {organisation_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectProvider;
