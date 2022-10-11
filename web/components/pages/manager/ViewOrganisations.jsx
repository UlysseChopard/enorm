const ViewOrganisations = ({ organisations }) => {
  if (!organisations) return <p>No Organisations</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Organisations</th>
        </tr>
      </thead>
      <tbody>
        {organisations.map((org) => (
          <tr key={org.id}>
            <th>{JSON.stringify(org)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewOrganisations;
