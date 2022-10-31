import {
  useActionData,
  useNavigate,
  Form,
  useLoaderData,
} from "react-router-dom";
import { getUser, update } from "../../api/accounts";

export async function loader() {
  const res = await getUser();
  if (!res.ok) throw new Error("Cannot access to user infos");
  const user = await res.json();
  return { user };
}

export async function action({ request }) {
  const data = await request.formData();
  const infos = Object.fromEntries(data);
  const res = await update(infos);
  if (!res.ok) throw new Error("An error occured please try again");
  return true;
}

export default function Account() {
  const updated = useActionData();
  const navigate = useNavigate();
  const { user } = useLoaderData();
  return (
    <Form action="post">
      <label>
        First name
        <input type="text" name="firstname" placeholder={user.firstname} />
      </label>
      <label>
        Last name
        <input type="text" name="lastname" placeholder={user.lastname} />
      </label>
      <label>
        Email
        <input type="email" name="email" placeholder={user.email} />
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
