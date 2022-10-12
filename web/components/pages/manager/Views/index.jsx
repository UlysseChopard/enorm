import Tabs from "components/misc/Tabs";
import ViewExperts from "./ViewExperts";
import ViewOrganisations from "./ViewOrganisations";

const Views = ({ experts, organisations }) => {
  return (
    <Tabs
      tabs={[
        { label: "Experts", view: () => <ViewExperts experts={experts} /> },
        {
          label: "Organisations",
          view: () => <ViewOrganisations organisations={organisations} />,
        },
      ]}
    />
  );
};

export default Views;
