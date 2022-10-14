const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="text-2xl font-bold mb-2">
    {children}
  </label>
);

export default Label;
