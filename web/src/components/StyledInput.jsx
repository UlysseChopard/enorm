const StyledInput = ({ type = "text", name, label, ...props }) => {
  return (
    <label className="flex flex-col m-2">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        {...props}
        className="rounded-lg h-14 mt-2"
      />
    </label>
  );
};

export default StyledInput;
