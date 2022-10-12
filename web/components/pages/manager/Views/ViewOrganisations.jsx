import Table from "components/misc/Table";
import useOrganisations from "lib/hooks/useOrganisations";

const ViewOrganisations = () => {
  const { organisations, isLoading, isError } = useOrganisations();
  if (isError) return <p>An error occurred, please try again</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!organisations.length) return <p>No Organisations</p>;
  console.log(organisations);
  return (
    <Table
      columns={[
        { label: "Name", value: "name" },
        { label: "Address", value: "address" },
        { label: "Parent organisation", value: "parent_name" },
      ]}
      data={organisations}
    />
  );
};

export default ViewOrganisations;
