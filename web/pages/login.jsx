import Input from "components/forms/Input";
import Submit from "components/forms/Submit";
import { useCallback, useRef, useEffect, useState } from "react";
import fetch from "lib/fetch";
import { useRouter } from "next/router";
import Back from "components/forms/Back";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: {
        email: email.current,
        password: password.current,
      },
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setMessage("Email or password are wrong");
    }
  }, []);

  useEffect(() => {
    router.prefetch("/dashboard");
  }, []);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-96 border rounded-xl p-4"
      >
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
          autoComplete="current-password"
          onChange={(e) => (password.current = e.target.value)}
        />
        <Submit label="Sign up" />
        <p>{message}</p>
      </form>
      <Back />
    </>
  );
};

export default Login;
