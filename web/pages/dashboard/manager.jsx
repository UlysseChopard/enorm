import Button from "components/forms/Button";
import { useCallback, useState, useMemo } from "react";
import CreateExpert from "components/pages/manager/CreateExpert";
import CreateOrganisation from "components/pages/manager/CreateOrganisation";
import ManagerLayout from "components/layout/Manager";
import useUser from "lib/hooks/useUser";
import useOrganisations from "lib/hooks/useOrganisations";
import Views from "components/pages/manager/Views";
import { useRouter } from "next/router";

const Manager = () => {
  const router = useRouter();
  const [form, setForm] = useState("");
  const {
    organisations,
    isLoading: isOrgLoading,
    isError: isOrgError,
  } = useOrganisations();
  const { user, isLoading, isError } = useUser();
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

  if (!user?.is_manager) {
    router.replace("/login");
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
        manager={user.id}
      />
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold my-4">
        {form ? `Add ${form}` : `Hi ${user.first_name}!`}
      </h1>
      <div className="flex justify-around">
        <div className="flex-1">
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
        {organisations.length ? (
          <div className="flex-auto w-96">
            <Views />
          </div>
        ) : null}
      </div>
    </>
  );
};

Manager.Layout = ManagerLayout;

export default Manager;
