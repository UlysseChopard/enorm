import Button from "components/forms/Button";
import { useCallback, useState } from "react";
import { OrganisationForm, ExpertForm } from "components/pages/manager";

const Expert = () => {
  const [form, setForm] = useState("");
  const goToDashboard = useCallback(() => setForm(""), []);
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Manager dashboard</h1>
      {!form && (
        <>
          <Button
            label="Create an organisation"
            onClick={() => setForm("organisation")}
          />
          <Button
            label="Link an expert to an organisation"
            onClick={() => setForm("expert")}
          />
        </>
      )}
      {form === "organisation" && (
        <OrganisationForm onSuccess={goToDashboard} onCancel={goToDashboard} />
      )}
      {form === "expert" && (
        <ExpertForm onSuccess={goToDashboard} onCancel={goToDashboard} />
      )}
    </>
  );
};

export default Expert;
