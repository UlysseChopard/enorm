import useOrganisations from "lib/hooks/useOrganisations";
import { useRef, useState, useCallback, useMemo } from "react";
import Form from "components/forms/Form";
import Input from "components/forms/Input";
import Select from "components/forms/Select";
import { create as createOrganisation } from "lib/api/organisations";

const CreateOrganisation = ({ onSuccess, onCancel, user }) => {
  const name = useRef();
  const address = useRef();
  const parent = useRef();
  const [message, setMessage] = useState("");

  const { organisations } = useOrganisations({ userId: user.id });

  const opts = useMemo(
    () =>
      organisations?.map(({ id, name }) => ({ label: name, value: id })) || [
        { value: "", label: "-- No organisation --" },
      ],
    [organisations]
  );

  const handleSubmit = useCallback(async () => {
    try {
      const res = await createOrganisation({
        name: name.current,
        address: address.current,
        parent: parent.current,
      });
      if (res.ok) {
        setMessage("Main organisation created");
        setTimeout(onSuccess, 500);
      } else {
        setMessage("An error occurred, please try again");
      }
    } catch (err) {
      setMessage("An error occurred, please try again");
    }
  }, []);
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Input
        name="name"
        label="Name"
        onChange={(e) => (name.current = e.target.value)}
      />
      <Input
        name="address"
        label="Address"
        onChange={(e) => (address.current = e.target.value)}
      />
      <Select
        name="parent"
        label="Parent organisation"
        options={opts}
        onChange={(e) => (parent.current = e.target.value)}
        required={false}
      />
      <p>{message}</p>
    </Form>
  );
};

export default CreateOrganisation;
