import { useLoaderData, useSubmit } from "react-router-dom";
import { get, accept, deny } from "@/api/registrations";

export const loader = async () => {
  const res = await get();
  return res.ok ? res.json() : res.status;
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData.get("group"));
  let res;
  switch (formData.get("type")) {
    case "accept":
      res = await accept(JSON.parse(formData.get("group")));
      return res.ok;
    case "deny":
      res = await deny(formData.get("id"));
      return res.ok;
  }
};

const Registrations = () => {
  const submit = useSubmit();
  const { sended, received } = useLoaderData();
  const accept = (group) => {
    const formData = new FormData();
    formData.append("group", JSON.stringify(group));
    formData.append("type", "accept");
    submit(formData, { method: "POST" });
  };
  const deny = (id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("type", "deny");
    submit(formData, { method: "POST" });
  };
  return (
    <>
      <h1>Received</h1>
      <table>
        <thead>
          <tr>
            <th>Beneficiary</th>
            <th>Group</th>
            <th>Sended at</th>
            <th>Accepted at</th>
            <th>Closed at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {received.map((r) => (
            <tr key={r.id}>
              <td>{`${r.firstname} ${r.lastname}`}</td>
              <td>{`${r.organisation} ${r.reference}`}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
              <td>
                {r.accepted_at && new Date(r.accepted_at).toLocaleString()}
              </td>
              <td>{r.denied_at && new Date(r.denied_at).toLocaleString()}</td>
              <td>
                <button type="submit" onClick={() => accept(r)}>
                  Accept
                </button>
                <button type="submit" onClick={() => deny(r.id)}>
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Registrations;
