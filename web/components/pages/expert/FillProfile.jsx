import Form from "components/forms/Form";
import { fillProfile } from "lib/api/experts";
import { useCallback, useState, useRef } from "react";

const FillProfile = ({ onSuccess, onCancel }) => {
  const [message, setMessage] = useState("");
  const description = useRef();
  const handleSubmit = useCallback(async () => {
    try {
      const res = await fillProfile({ description });
      if (res.ok) {
        setMessage("Success on filling the profile");
        setTimeout(onSuccess, 800);
      }
    } catch (err) {
      setMessage("An error occurred, please try again");
    }
  }, []);
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <label htmlFor="description">Describe yourself</label>
      <textarea
        id="description"
        onChange={(e) => (description.current = e.target.value)}
      />
      <p>{message}</p>
    </Form>
  );
};

export default FillProfile;
