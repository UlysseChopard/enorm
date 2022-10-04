import { useCallback } from "react";

const Checkbox = ({ value, label, name, onChange }) => {
  return (
    <div className="w-32">
      <input
        className="text-xl m-2"
        type="checkbox"
        name={name}
        id={value}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
};

export default Checkbox;
