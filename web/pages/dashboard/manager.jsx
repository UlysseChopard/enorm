import Button from "components/forms/Button";
import { useCallback, useState, useMemo } from "react";
import CreateExpert from "components/pages/manager/CreateExpert";
import CreateOrganisation from "components/pages/manager/CreateOrganisation";
import ManagerLayout from "components/layout/Manager";
import useUser from "lib/hooks/useUser";
import useExperts from "lib/hooks/useExperts";
import useOrganisations from "lib/hooks/useOrganisations";
import ViewExperts from "components/pages/manager/ViewExperts";
import ViewOrganisations from "components/pages/manager/ViewOrganisations";

const Manager = () => {
  const [form, setForm] = useState("");
  const {
    organisations,
    isLoading: isOrgLoading,
    isError: isOrgError,
  } = useOrganisations();
  const { user, isLoading, isError } = useUser();
  const { experts } = useExperts();
  const goToDashboard = useCallback(() => setForm(""), []);

  const organisationsOpts = useMemo(
    () =>
      organisations?.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [organisations]
  );

  if (isLoading || isOrgLoading) return <p>Loading...</p>;

  if (isError || isOrgError) return <p>An error occurred, please retry</p>;

  if (form === "organisation") {
    return (
      <CreateOrganisation
        onSuccess={goToDashboard}
        onCancel={goToDashboard}
        organisationsOpts={organisationsOpts}
      />
    );
  }

  if (form === "expert") {
    return (
      <CreateExpert
        onSuccess={goToDashboard}
        onCancel={goToDashboard}
        organisationsOpts={organisationsOpts}
      />
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold my-4">
        {form ? `Add ${form}` : `Hi ${user.first_name}!`}
      </h1>
      <div>
        <Button
          label={
            organisations.length
              ? "Add an establishment"
              : "Create your main organisation"
          }
          onClick={() => setForm("organisation")}
        />
        {organisations.length ? (
          <Button
            label="Create an expert account"
            onClick={() => setForm("expert")}
          />
        ) : null}
      </div>
      <div>
        <ViewExperts experts={experts} />
        <ViewOrganisations organisations={organisations} />
      </div>
    </>
  );
};

Manager.Layout = ManagerLayout;

export default Manager;
