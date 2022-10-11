import { useRef, useState, useCallback } from "react";
import Form from "components/forms/Form";
import Input from "components/forms/Input";
import Select from "components/forms/Select";
import { create as createOrganisation } from "lib/api/organisations";

const CreateOrganisation = ({ onSuccess, onCancel, organisationsOpts }) => {
  const name = useRef();
  const address = useRef();
  const parent = useRef();
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(async () => {
    try {
      const res = await createOrganisation({
        name: name.current,
        address: address.current,
        parent: parent.current,
      });
      if (res.ok) {
        setMessage(
          parent.current ? "Added establishement" : "Main organisation created"
        );
        setTimeout(onSuccess, 800);
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
      {organisationsOpts?.length ? (
        <Select
          name="parent"
          label="Parent organisation"
          options={organisationsOpts}
          onChange={(e) => (parent.current = e.target.value)}
          required={false}
        />
      ) : null}
      <p>{message}</p>
    </Form>
  );
};

export default CreateOrganisation;
