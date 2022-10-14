import Label from "./Label";
const Select = ({ name, label, options, onChange, required = true }) => {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        required={required}
        onChange={onChange}
        className="text-xl p-2 rounded"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-xl p-2">
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
