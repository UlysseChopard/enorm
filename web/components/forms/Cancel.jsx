const Cancel = ({ label = "Cancel", onClick }) => {
  return (
    <button
      className="text-2xl bg-red-200 rounded mt-4 p-4 hover:opacity-80 focus:opacity-80"
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Cancel;
