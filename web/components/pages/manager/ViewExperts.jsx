const ViewExperts = ({ experts }) => {
  if (!experts) return <p>No experts</p>;
  return (
    <div>
      {experts.map((org) => (
        <p>{JSON.stringify(org)}</p>
      ))}
    </div>
  );
};

export default ViewExperts;
