import Button from "components/forms/Button";
import Main from "components/layout/Main";
import { useCallback, useState } from "react";
import { CreateOrganisationForm, LinkUserForm } from "components/pages/manager";

const Manager = () => {
  const [form, setForm] = useState("");
  const goToDashboard = useCallback(() => setForm(""), []);
  return (
    <Main>
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
      {form === "organisation" ? (
        <CreateOrganisationForm
          onSuccess={goToDashboard}
          onCancel={goToDashboard}
        />
      ) : (
        <LinkUserForm
          role={form}
          onSuccess={goToDashboard}
          onCancel={goToDashboard}
        />
      )}
    </Main>
  );
};

export default Manager;
