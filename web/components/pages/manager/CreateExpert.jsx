import Form from "components/forms/Form";
import Input from "components/forms/Input";
import Select from "components/forms/Select";
import { declareExpert } from "lib/api/experts";
import { useCallback, useState, useRef } from "react";

const CreateExpert = ({
  onSuccess,
  onCancel,
  organisationsOpts
}) => {
  const [message, setMessage] = useState("");
  const email = useRef();
  const [organisation, setOrganisation] = useState(organisationsOpts[0].value);

  const handleSubmit = useCallback(async () => {
    try {
      const res = await declareExpert({
        email: email.current,
        organisation: organisation,
      });
      if (res.ok) {
        onSuccess();
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
        options={organisationsOpts}
        onChange={(e) => setOrganisation(e.target.value)}
      />
      <p>{message}</p>
    </Form>
  );
};

export default CreateExpert;
