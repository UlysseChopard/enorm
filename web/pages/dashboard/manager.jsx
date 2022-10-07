import Button from "components/forms/Button";
import { useCallback, useState, useMemo } from "react";
import CreateExpert from "components/pages/manager/CreateExpert";
import CreateOrganisation from "components/pages/manager/CreateOrganisation";
import ManagerLayout from "components/layout/Manager";
import useUser from "lib/hooks/useUser";
import useOrganisations from "lib/hooks/useOrganisations";

const Manager = () => {
  const { user, isLoading: isUserLoading, isError: isUserError } = useUser();
  const { organisations, isLoading: isOrgLoading, isError: isOrgError } = useOrganisations();
  const [form, setForm] = useState("");
  const goToDashboard = useCallback(() => setForm(""), []);

  const organisationsOpts = useMemo(
    () => organisations?.map(({ id, name }) => ({ label: name, value: id })),
    [organisations]
  );

  if (isUserLoading || isOrgLoading) {
    return <p>Loading...</p>;
  }

  if (isUserError || isOrgError) {
    return <p>An error occurred, please try to log in</p>;
  }

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
      {!form && (
        <>
          <Button
            label="Create an organisation"
            onClick={() => setForm("organisation")}
          />
          {organisations.length ? <Button
            label="Add an expert to an organisation"
            onClick={() => setForm("expert")}
          /> : null}
        </>
      )}
    </>
  );
};

Manager.Layout = ManagerLayout;

export default Manager;
