const Submit = ({ label = "Submit" }) => {
  return (
    <button
      className="text-2xl bg-orange-200 rounded mt-4 p-4 hover:opacity-80 focus:opacity-80"
      type="submit"
    >
      {label}
    </button>
  );
};

export default Submit;
