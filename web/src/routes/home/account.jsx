import { useEffect } from "react";
import {
  useActionData,
  useNavigate,
  Form,
  useLoaderData,
} from "react-router-dom";
import { getUser, update, updatePassword } from "../../api/accounts";

export async function loader() {
  const res = await getUser();
  if (!res.ok) throw new Error("Cannot access to user infos");
  const user = await res.json();
  return { user };
}

export async function action({ request }) {
  const data = await request.formData();
  const { email, firstname, lastname, oldpass, newpass } =
    Object.fromEntries(data);
  if (oldpass && newpass) {
    const resPass = await updatePassword(oldpass, newpass);
    if (!resPass.ok) throw new Error("Could not update profile");
  }
  const res = await update({ email, firstname, lastname });
  if (!res.ok)
    throw new Error(
      "Password has been correctly updated but the rest of the infos could not"
    );
  return true;
}

export default function Account() {
  const updated = useActionData();
  const navigate = useNavigate();
  const { user } = useLoaderData();
  return (
    <Form autoComplete="on" method="post">
      <label>
        First name
        <input
          type="text"
          name="firstname"
          autoComplete="given-name"
          placeholder={user.firstname}
          defaultValue={user.firstname}
        />
      </label>
      <label>
        Last name
        <input
          type="text"
          name="lastname"
          autoComplete="family-name"
          placeholder={user.lastname}
          defaultValue={user.lastname}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder={user.email}
          defaultValue={user.email}
        />
      </label>
      <label>
        Current password
        <input type="password" name="oldpass" autoComplete="current-password" />
      </label>
      <label>
        New password
        <input type="password" name="newpass" autoComplete="new-password" />
      </label>
      <div>
        <button type="button" onClick={() => navigate(-1)}>
          Go back
        </button>
        <button type="submit">Edit profile</button>
      </div>
      {updated && <p>Successfully updated</p>}
    </Form>
  );
}
