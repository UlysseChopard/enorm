import { useState, useRef, useCallback } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { get, add, addOne, unlink } from "@/api/organisations/members";
import { allow, disallow } from "@/api/organisations/members/roles";
import { create } from "@/api/sessions/tokens";
import {
  addUser,
  removeUser,
  get as getEstablishments,
} from "@/api/organisations/establishments";

export async function loader() {
  const resOm = await get();
  const resE = await getEstablishments();
  const { members } = await resOm.json();
  const { establishments } = await resE.json();
  return { members, establishments };
}

export async function action({ request }) {
  const formData = await request.formData();
  let res;
  switch (formData.get("type")) {
    case "unlink":
      res = await unlink(formData.get("member"));
      break;
    case "add":
      res = await add(formData, {
        emailColumn: formData.get("email-column"),
        separator: formData.get("separator"),
        noHeader: !formData.get("header"),
      });
      break;
    case "addOne":
      res = await addOne(formData.get("email"), formData.get("roles"));
      break;
    case "allow":
      res = await allow(formData.get("member"), formData.get("role"));
      break;
    case "disallow":
      res = await disallow(formData.get("member"), formData.get("role"));
      break;
    case "removeUser":
      res = await removeUser(
        formData.get("member"),
        formData.get("establishment")
      );
      break;
    case "addUser":
      res = await addUser(formData.get("member"), formData.get("establishment"));
      break;
    case "createToken":
      res = await create(formData.get("organisationMember"));
      break;
    default:
      throw new Error("Missing type for action");
  }
  return res.json();
}

const AddOneDialog = ({ onClose, open }) => {
  const { t } = useTranslation(null, { keyPrefix: "members" });
  const [email, setEmail] = useState("");
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="POST">
        <DialogTitle>{t("addOne")}</DialogTitle>
        <DialogContent>
          <input type="hidden" name="type" value="addOne" />
          <TextField
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("cancel")}</Button>
          <Button
            disabled={!email}
            variant="contained"
            type="submit"
            onClick={onClose}
          >
            {t("submit")}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

const UploadUsersDialog = ({ onClose, open }) => {
  const { t } = useTranslation(null, { keyPrefix: "members" });
  const [filename, setFilename] = useState(null);
  const [hasHeader, setHasHeader] = useState(true);
  const inputFile = useRef();
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="POST" encType="multipart/form-data">
        <input type="hidden" name="type" value="add" />
        <DialogTitle>{t("uploadTitle")}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} width={300}>
            <Box>
              <Button
                component="label"
                htmlFor="members"
                variant="contained"
                startIcon={<AttachmentIcon />}
              >
                {t("file")}
                <input
                  type="file"
                  id="members"
                  name="file"
                  hidden
                  accept=".csv, .txt, text/csv, text/tab-separated-value"
                  ref={inputFile}
                  onChange={() => setFilename(inputFile.current.files[0].name)}
                />
              </Button>
              {filename && filename}
            </Box>
            <TextField
              type="text"
              maxLength="1"
              minLength="1"
              name="separator"
              defaultValue=","
              helperText={t("separator")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="header"
                  checked={hasHeader}
                  onChange={() => setHasHeader(!hasHeader)}
                />
              }
              label={t("hasHeader")}
            />
            {hasHeader && (
              <>
                <TextField
                  type="text"
                  name="email-column"
                  defaultValue="email"
                  helperText={t("emailColumn")}
                />
              </>
            )}
            <input type="hidden" name="type" value="uploadUsers" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("cancel")}</Button>
          <Button
            disabled={!filename}
            variant="contained"
            type="submit"
            onClick={onClose}
          >
            {t("submit")}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default function Members() {
  const { t } = useTranslation(null, { keyPrefix: "members" });
  const { establishments, members } = useLoaderData();
  const submit = useSubmit();
  const [open, setOpen] = useState(false);
  const getRoles = useCallback(({ is_manager, is_admin, is_expert }) => {
    const roles = [];
    is_manager && roles.push("manager");
    is_expert && roles.push("expert");
    is_admin && roles.push("admin");
    return roles;
  }, []);
  return (
    <>
      <div>
        <Button type="button" onClick={() => setOpen("upload")}>
          {t("upload")}
        </Button>
        <UploadUsersDialog
          open={open === "upload"}
          onClose={() => setOpen("")}
        />
        <Button type="button" onClick={() => setOpen("addOne")}>
          {t("addOne")}
        </Button>
        <AddOneDialog open={open === "addOne"} onClose={() => setOpen("")} />
      </div>
      <table>
        <thead>
          <tr>
            <th>{t("email")}</th>
            <th>{t("establishment")}</th>
            <th>{t("role")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {members?.map((member) => {
            const roles = getRoles(member);
            const formData = new FormData();
            formData.append("member", member.id);
            return (
              <tr key={member.id}>
                <td>{member.email}</td>
                <td>
                  <FormControl fullWidth>
                    <Select value={member.establishments} multiple>
                      {establishments?.map(({ id, name }) => (
                        <MenuItem
                          key={id}
                          value={id}
                          onClick={() => {
                            formData.append(
                              "type",
                              member.establishments.includes(id)
                                ? "removeUser"
                                : "addUser"
                            );
                            formData.append("establishment", id);
                            submit(formData, { method: "PATCH" });
                          }}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl fullWidth>
                    <Select
                      multiple
                      value={roles}
                      onChange={(e) => {
                        formData.append("role", e.target.value.pop());
                        formData.append(
                          "type",
                          e.target.value.length < roles.length
                            ? "disallow"
                            : "allow"
                        );
                        submit(formData, { method: "PATCH" });
                      }}
                    >
                      <MenuItem
                        value={"admin"}
                        onClick={() => formData.append("role", "admin")}
                      >
                        {t("admin")}
                      </MenuItem>
                      <MenuItem
                        value={"manager"}
                        onClick={() => formData.append("role", "manager")}
                      >
                        {t("manager")}
                      </MenuItem>
                      <MenuItem
                        value={"expert"}
                        onClick={() => formData.append("role", "expert")}
                      >
                        {t("expert")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <Form method="DELETE">
                    <input type="hidden" name="type" value="unlink" />
                    <input type="hidden" name="member" value={member.id} />
                    <Button type="submit">{t("unlink")}</Button>
                  </Form>
                  {member.token &&
                  new Date() < new Date(member.token_expires_at) ? (
                    <Button
                      onClick={() => navigator.clipboard.writeText(member.token)}
                    >
                      {member.token}
                    </Button>
                  ) : (
                    <Form method="PUT">
                      <input type="hidden" name="type" value="createToken" />
                      <input
                        type="hidden"
                        name="organisationMember"
                        value={member.id}
                      />
                      <Button type="submit" variant="contained">
                        {t("createToken")}
                      </Button>
                    </Form>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
