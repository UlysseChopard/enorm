import { useState, useRef } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import EditIcon from "@mui/icons-material/Edit";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { uploadUsers, get, updateOrganisation } from "@/api/administration";

export async function loader() {
  const res = await get();
  return res.ok ? res.json() : res.status;
}

export async function action({ request }) {
  const formData = await request.formData();
  let res;
  switch (formData.get("type")) {
    case "organisation":
      res = await updateOrganisation(formData.get("id"), formData.get("name"));
      break;
    case "uploadUsers":
      console.log(formData.get("header"));
      res = await uploadUsers(formData, {
        emailColumn: formData.get("email-column"),
        separator: formData.get("separator"),
        noHeader: !formData.get("header"),
      });
      break;
    default:
      return null;
  }
  return res.ok ? res.json() : res.status;
}

const UploadUsersDialog = ({ onClose, open }) => {
  const { t } = useTranslation(null, { keyPrefix: "administration" });
  const [filename, setFilename] = useState(null);
  const [hasHeader, setHasHeader] = useState(true);
  const inputFile = useRef();
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="POST" encType="multipart/form-data" autoComplete="on">
        <DialogTitle>{t("importUsersTitle")}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} width={300}>
            <Box>
              <Button
                component="label"
                htmlFor="users"
                variant="contained"
                startIcon={<AttachmentIcon />}
              >
                {t("file")}
                <input
                  type="file"
                  id="users"
                  name="users"
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

export default function Administration() {
  const { t } = useTranslation(null, { keyPrefix: "administration" });
  const submit = useSubmit();
  const { organisation, users } = useLoaderData();
  const [nameHovered, setNameHovered] = useState(false);
  const [nameEdited, setNameEdited] = useState(false);
  const [name, setName] = useState(organisation?.name ?? "");
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        {nameEdited ? (
          <TextField
            value={name}
            onKeyUp={(e) => {
              if (e.key !== "Enter") return;
              const formData = new FormData();
              formData.append("name", e.target.value);
              formData.append("id", organisation.id);
              formData.append("type", "organisation");
              submit(formData, { method: "PUT" });
              setNameEdited(false);
            }}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <Typography
            variant="h3"
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setTimeout(() => setNameHovered(false), 150)}
          >
            {organisation.name}
            {nameHovered && (
              <EditIcon
                onClick={() => setNameEdited(true)}
                sx={{ cursor: "pointer" }}
              />
            )}
          </Typography>
        )}
        <Button type="button" onClick={() => setOpen(true)}>
          {t("uploadUsers")}
        </Button>
        <UploadUsersDialog open={open} onClose={() => setOpen(false)} />
      </div>
      <table>
        <thead>
          <tr>
            <th>{t("email")}</th>
            <th>{t("firstname")}</th>
            <th>{t("lastname")}</th>
            <th>{t("establishment")}</th>
            <th>{t("role")}</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>empty for now</td>
              <td>empty for now</td>
              <td>
                <FormControl fullWidth>
                  <InputLabel id="establishment-label">
                    {t("establishment")}
                  </InputLabel>
                  <Select labelId="establishment-label" label="test" value={0}>
                    <MenuItem value={0}>Establishment 0</MenuItem>
                  </Select>
                </FormControl>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
