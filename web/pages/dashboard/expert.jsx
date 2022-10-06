import Button from "components/forms/Button";
import { useCallback, useState } from "react";
import { FillInfosForm } from "components/pages/expert";
import ExpertLayout from "components/layout/Expert";

const Expert = () => {
  const [form, setForm] = useState("");
  const goToDashboard = useCallback(() => setForm(""), []);
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Expert dashboard</h1>
      {!form && (
        <>
          <Button
            label="Fill my informations"
            onClick={() => setForm("infos")}
          />
        </>
      )}
      {form === "infos" && (
        <FillInfosForm onSuccess={goToDashboard} onCancel={goToDashboard} />
      )}
    </>
  );
};

Expert.Layout = ExpertLayout;

export default Expert;
