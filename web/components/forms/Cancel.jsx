const Cancel = ({ label = "Cancel", onClick }) => {
  return (
    <button
      className="text-2xl bg-red-600 text-sky-50 uppercase rounded-full mt-2 p-2 hover:opacity-80 focus:opacity-80"
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Cancel;
