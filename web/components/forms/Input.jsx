import Label from "./Label";
const Input = ({
  name,
  type = "text",
  autoComplete = "on",
  label,
  required = true,
  onChange,
  ...props
}) => {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <input
        className="text-xl p-2 rounded"
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        onChange={onChange}
        {...props}
      />
    </>
  );
};

export default Input;
