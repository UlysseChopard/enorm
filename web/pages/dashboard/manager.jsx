import Button from "components/forms/Button";
import { useCallback, useState, useMemo, useEffect } from "react";
import CreateExpert from "components/pages/manager/CreateExpert";
import CreateOrganisation from "components/pages/manager/CreateOrganisation";
import ManagerLayout from "components/layout/Manager";
import useUser from "lib/hooks/useUser";
import useOrganisations from "lib/hooks/useOrganisations";
import { useRouter } from "next/router";

const Manager = () => {
  const router = useRouter();
  const [callApi, setCallApi] = useState(true);
  useEffect(() => {
    if (router) router.events.on("routeChangeStart", () => setCallApi(false));
  }, [router]);
  const { user, isLoading, isError } = useUser(callApi);
  const {
    organisations,
    isLoading: isOrgLoading,
    isError: isOrgError,
  } = useOrganisations(callApi);
  const [form, setForm] = useState("");
  const goToDashboard = useCallback(() => setForm(""), []);

  const organisationsOpts = useMemo(
    () =>
      organisations?.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    []
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
      {!form && (
        <>
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
        </>
      )}
    </>
  );
};

Manager.Layout = ManagerLayout;

export default Manager;
