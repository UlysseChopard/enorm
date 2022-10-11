const ViewOrganisations = ({ organisations }) => {
  if (!organisations) return <p>No organisation</p>;
  return (
    <div>
      {organisations.map((org) => (
        <p>{JSON.stringify(org)}</p>
      ))}
    </div>
  );
};

export default ViewOrganisations;
