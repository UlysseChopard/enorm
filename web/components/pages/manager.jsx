import Form from "components/forms/Form";
import Input from "components/forms/Input";
import Submit from "components/forms/Submit";
import Select from "components/forms/Select";
import { getAll } from "lib/api/organisations";
import { create as createOrganisation } from "lib/api/organisations";
import { create as createExpert } from "lib/api/experts";
import { useCallback, useState, useRef, useEffect } from "react";

export const OrganisationForm = ({ onSuccess, onCancel }) => {
  const name = useRef();
  const address = useRef();
  const parent = useRef();
  const [message, setMessage] = useState("");

  const [opts, setOpts] = useState([
    { value: "", label: "-- No organisation --" },
  ]);
  useEffect(() => {
    const fillOrganisations = async () => {
      try {
        const { organisations } = await getAll();
        if (organisations) {
          const options = [
            { value: "", label: "-- No organisation --" },
            ...organisations.map((org) => ({
              value: org.id,
              label: org.name,
            })),
          ];
          setOpts(options);
        } else {
          setMessage("Could not load your organisations");
        }
      } catch (err) {
        setMessage("An error occurred, please retry");
      }
    };

    fillOrganisations();
  }, []);

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
        options={
          opts || [
            {
              value: "",
              label: "-- No parent to link to --",
            },
            { value: 1, label: "Sncf" },
            { value: 2, label: "FIF" },
          ]
        }
        onChange={(e) => (parent.current = e.target.value)}
        required={false}
      />
      <p>{message}</p>
    </Form>
  );
};

export const ExpertForm = ({ onSuccess, onCancel }) => {
  const [message, setMessage] = useState("");
  const email = useRef();
  const organisation = useRef();
  const [organisations, setOrganisations] = useState([]);
  useEffect(() => {
    const fillOrganisations = async () => {
      try {
        const { organisations } = await getAll();
        if (organisations) {
          setOrganisations(
            organisations.map((org) => ({
              value: org.id,
              label: org.name,
            }))
          );
        } else {
          setMessage("Could not load your organisations");
        }
      } catch (err) {
        setMessage("An error occurred, please retry");
      }
    };

    fillOrganisations();
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const res = await createExpert({
        email: email.current,
        organisation: organisation.current,
      });
      if (res.ok) {
        setMessage("Expert linked to your organisation");
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
        name="email"
        label="Email"
        type="email"
        onChange={(e) => (email.current = e.target.value)}
      />
      <Select
        name="organisation"
        label="Organisation"
        options={
          organisations || [
            { value: "", label: "-- My default organisation --" },
            { value: 1, label: "Sncf" },
            { value: 2, label: "FIF" },
          ]
        }
        onChange={(e) => (organisation.current = e.target.value)}
      />
      <p>{message}</p>
    </Form>
  );
};
