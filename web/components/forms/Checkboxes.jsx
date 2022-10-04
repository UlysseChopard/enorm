import { useCallback, useState } from "react";
import Checkbox from "components/forms/Checkbox";

const Checkboxes = ({ options, label, onChange }) => {
  const [checked, setChecked] = useState([]);
  const handleChange = useCallback(
    (e) => {
      if (e.target.checked) {
        const local = checked;
        local.push(e.target.value);
        setChecked(local);
      } else {
        setChecked(
          checked.splice(
            checked.findIndex((el) => el === e.target.value),
            1
          )
        );
      }
      onChange(checked);
    },
    [onChange]
  );
  return (
    <div className="flex flex-col justify-between w-full mb-2">
      <fieldset
        className="border rounded p-2 flex flex-col items-center"
        onChange={handleChange}
      >
        <legend className="text-2xl font-bold">{label}</legend>
        {options.map((opt) => (
          <Checkbox
            label={opt.label}
            value={opt.value}
            name={opt.name}
            key={opt.value}
          />
        ))}
      </fieldset>
    </div>
  );
};

export default Checkboxes;
