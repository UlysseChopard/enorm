import Form from "components/forms/Form";
import Input from "components/forms/Input";
import Select from "components/forms/Select";
import { declareExpert } from "lib/api/experts";
import { useCallback, useState, useRef, useEffect } from "react";

const CreateExpert = ({
  onSuccess,
  onCancel,
  manager: { organisation = "your organisation" },
}) => {
  const [message, setMessage] = useState("");
  const email = useRef();
  const expertOrganisation = useRef();
  const successMessage = `Expert added to ${
    expertOrganisation.current
      ? organisations.filter(
          (org) => expertOrganisation.current === org.value
        )[0].label
      : manager.organisation
  }`;
  const [opts, setOpts] = useState([]);

  const { organisations, isError } = useOrganisations({ userId: user.id });
  useEffect(() => {
    if (isError) {
      setOpts([
        {
          label: "An error occurred while loading your organisations",
          value: "",
        },
      ]);
    }

    setOpts(
      organisations.map(({ id, name }) => ({
        value: id,
        label: name,
      }))
    );
  }, []);
  const handleSubmit = useCallback(async () => {
    try {
      const res = await declareExpert({
        email: email.current,
        organisation: expertOrganisation.current,
      });
      if (res.ok) {
        setMessage(successMessage);
        setTimeout(onSuccess, 800);
      } else {
        setMessage("An error occurred, please try again");
      }
    } catch (err) {
      setMessage("An error occurred, please retry");
    }
  }, []);
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Input
        name="email"
        label="Email"
        type="email"
        onChange={(e) => (email.current = e.target.value)}
      />
      <Select
        name="organisation"
        label="Organisation"
        options={opts}
        onChange={(e) => (expertOrganisation.current = e.target.value)}
      />
      <p>{message}</p>
    </Form>
  );
};

export default CreateExpert;
