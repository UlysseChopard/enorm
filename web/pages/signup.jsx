import Input from "components/forms/Input";
import Checkboxes from "components/forms/Checkboxes";
import Submit from "components/forms/Submit";
import { useCallback, useEffect, useRef, useState } from "react";
import fetch from "lib/fetch";
import { useRouter } from "next/router";
import Back from "components/forms/Back";

const Signup = () => {
  const router = useRouter();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();

  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const res = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        body: {
          firstName: firstName.current,
          lastName: lastName.current,
          email: email.current,
          password: password.current,
          roles,
        },
      });
      console.log(firstName.current, roles);
      if (res.ok) {
        router.push("/dashboard");
      }
      const data = await res.json();
      setMessage(data.message);
    },
    [roles]
  );

  useEffect(() => {
    router.prefetch("/dashboard");
  }, []);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-96 border rounded-xl p-4 drop-shadow"
      >
        <Input
          name="first-name"
          label="First name"
          autoComplete="given-name"
          onChange={(e) => (firstName.current = e.target.value)}
        />
        <Input
          name="last-name"
          label="Last name"
          autoComplete="family-name"
          onChange={(e) => (lastName.current = e.target.value)}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          onChange={(e) => (email.current = e.target.value)}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          onChange={(e) => (password.current = e.target.value)}
        />
        <Checkboxes
          name="role"
          label="Roles"
          options={[
            { label: "Manager", value: "manager" },
            { label: "Expert", value: "expert" },
          ]}
          onChange={setRoles}
        />
        <Submit label="Sign up" />
        <p>{message}</p>
      </form>
      <Back />
    </>
  );
};

export default Signup;
