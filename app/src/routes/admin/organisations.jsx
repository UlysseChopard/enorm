import {
  useLoaderData,
  useActionData,
  useSubmit,
  Form,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { get, create, remove } from "@/api/admin/organisations";
import { create as createAccount } from "@/api/accounts";
import { create as createToken } from "@/api/sessions/tokens";
import { allow } from "@/api/organisations/members/roles";

export const loader = async () => {
  const res = await get();
  return res.json();
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  if (formData.get("type") === "create") {
    const email = formData.get("email");
    const { account } = await createAccount({
      email,
    }).then((res) => res.json());
    const { organisation } = await create({
      account: account.id,
    }).then((res) => res.json());
    const { role } = await allow(organisation.member, "admin", organisation.id);
    return { account, organisation, role };
  } else if (formData.get("type") === "remove") {
    const res = await remove(formData.get("id"));
    return res.json();
  } else if (formData.get("type") === "createToken") {
    const res = await createToken(formData.get("organisationMember"));
    return res.json();
  }
};
const Organisations = () => {
  const { t } = useTranslation(null, { keyPrefix: "organisations" });
  const submit = useSubmit();
  const [open, setOpen] = useState(false);
  const { organisations } = useLoaderData();
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.account) {
      setOpen(false);
    }
  }, [actionData]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>{t("create")}</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t("createTitle")}</DialogTitle>
        <Form method="POST">
          <DialogContent>
            <input type="hidden" name="type" value="create" />
            <TextField
              autoComplete="email"
              name="email"
              type="email"
              label={t("email")}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>{t("cancel")}</Button>
            <Button variant="contained" type="submit">
              {t("submit")}
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
      <table>
        <thead>
          <tr>
            <th scope="col">{t("name")}</th>
            <th scope="col">{t("email")}</th>
            <th scope="col">{t("admin")}</th>
            <th scope="col">{t("token")}</th>
          </tr>
        </thead>
        <tbody>
          {organisations
            .sort((a, b) => a.id - b.id)
            .map(
              ({
                id,
                name,
                organisation_member,
                email,
                firstname,
                lastname,
                token,
                expires_at,
              }) => (
                <tr key={id}>
                  <th scope="row">{name}</th>
                  <td>{email}</td>
                  <td>{`${firstname ?? ""} ${lastname ?? ""}`}</td>
                  <td>
                    {token && new Date() < new Date(expires_at) ? (
                      <Button
                        onClick={() => navigator.clipboard.writeText(token)}
                      >
                        {token}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => {
                          const formData = new FormData();
                          formData.append(
                            "organisationMember",
                            organisation_member
                          );
                          formData.append("type", "createToken");
                          submit(formData, { method: "POST" });
                        }}
                      >
                        {t("createToken")}
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button
                      type="button"
                      onClick={() => {
                        const formData = new FormData();
                        formData.append("id", id);
                        formData.append("type", "remove");
                        submit(formData, { method: "POST" });
                      }}
                    >
                      {t("remove")}
                    </Button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </>
  );
};

export default Organisations;
