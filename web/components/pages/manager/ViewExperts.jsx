const ViewExperts = ({ experts }) => {
  if (!experts) return <p>No experts</p>;
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={4}>Experts</th>
        </tr>
        <tr>
          <th colSpan={1}>Email</th>
          <th colSpan={1}>First name</th>
          <th colSpan={1}>Last name</th>
          <th colSpan={1}>Organisation</th>
        </tr>
      </thead>
      <tbody>
        {experts.map((expert) => (
          <tr key={expert.id}>
            <th>{expert.email}</th>
            <th>{expert.first_name}</th>
            <th>{expert.last_name}</th>
            <th>{expert.organisation_name}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewExperts;
