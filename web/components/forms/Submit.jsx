const Submit = ({ label = "Submit" }) => {
  return (
    <button
      className="drop-shadow text-2xl uppercase bg-orange-600 rounded-full mt-2 p-2 text-sky-50 hover:opacity-80 focus:opacity-80"
      type="submit"
    >
      {label}
    </button>
  );
};

export default Submit;
