const StyledInput = ({ type = "text", name, label }) => {
  return (
    <label className="flex flex-col">
      <span>{label}</span>
      <input type={type} name={name} />
    </label>
  );
};

export default StyledInput;
