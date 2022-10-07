import Button from "components/forms/Button";
import { useCallback, useState } from "react";
import CreateExpert from "components/pages/manager/CreateExpert";
import CreateOrganisation from "components/pages/manager/CreateOrganisation";
import ManagerLayout from "components/layout/Manager";
import useUser from "lib/hooks/useUser";

const Manager = () => {
  const { user, isLoading, isError } = useUser();
  const [form, setForm] = useState("");
  const goToDashboard = useCallback(() => setForm(""), []);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred, please try to log in</p>;
  }

  if (form === "organisation") {
    return (
      <CreateOrganisation
        onSuccess={goToDashboard}
        onCancel={goToDashboard}
        user={user}
      />
    );
  }

  if (form === "expert") {
    return (
      <CreateExpert
        onSuccess={goToDashboard}
        onCancel={goToDashboard}
        user={user}
      />
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold my-4">
        {form ? `Add ${form}` : "Manager dashboard"}
      </h1>
      {!form && (
        <>
          <Button
            label="Create an organisation"
            onClick={() => setForm("organisation")}
          />
          <Button
            label="Add an expert to an organisation"
            onClick={() => setForm("expert")}
          />
          <Button
            label="Add a manager to an organisation"
            onClick={() => setForm("manager")}
          />
        </>
      )}
    </>
  );
};

Manager.Layout = ManagerLayout;

export default Manager;
