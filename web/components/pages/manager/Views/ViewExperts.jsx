import useExperts from "lib/hooks/useExperts";
import Table from "components/misc/Table";

const ViewExperts = () => {
  const { experts, isLoading, isError } = useExperts();
  if (isError) return <p>An error occurred, please try again</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!experts.length) return <p>No experts</p>;
  return (
    <Table
      columns={[
        { value: "first_name", label: "First name" },
        { value: "last_name", label: "Last name" },
        { value: "email", label: "Email" },
        { value: "organisation_name", label: "Organisations" },
      ]}
      data={experts}
    />
  );
};

export default ViewExperts;
