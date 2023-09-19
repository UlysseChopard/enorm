import { useActionData, useSearchParams, Form } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@/components/Snackbar";
import { getMagicLink } from "@/api/sessions";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const res = await getMagicLink(email);
  return res.ok;
}

const ResetPassword = () => {
  const magicLinkSent = useActionData();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Form
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      autoComplete="on"
      method="post"
    >
      <TextField
        required
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        label="Email"
        variant="filled"
        value={searchParams.email}
        onChange={(e) => setSearchParams({ email: e.target.value })}
        helperText="Please enter your email adress and a link will be sent to allow you to connect to Enorm"
      />
      <div
        style={{
          display: "flex",
          width: "25%",
          justifyContent: "space-around",
          margin: "2rem 0",
        }}
      >
        <Button variant="text" href="/login">
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </div>
      <Snackbar severity="info" msg="Token sent" open={magicLinkSent} />
    </Form>
  );
};

export default ResetPassword;
