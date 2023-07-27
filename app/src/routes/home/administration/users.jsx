import { useState, useRef } from "react";
import { Form, useLoaderData } from "react-router-dom";
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
import { get, add } from "@/api/administration/users";

export async function loader() {
  const res = await get();
  return res.ok ? res.json() : res.status;
}

export async function action({ request }) {
  const formData = await request.formData();
  const res = await add(formData, {
    emailColumn: formData.get("email-column"),
    separator: formData.get("separator"),
    noHeader: !formData.get("header"),
  });
  return res.ok ? res.json() : res.status;
}

const UploadUsersDialog = ({ onClose, open }) => {
  const { t } = useTranslation(null, { keyPrefix: "users" });
  const [filename, setFilename] = useState(null);
  const [hasHeader, setHasHeader] = useState(true);
  const inputFile = useRef();
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="POST" encType="multipart/form-data">
        <DialogTitle>{t("uploadTitle")}</DialogTitle>
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
  const { t } = useTranslation(null, { keyPrefix: "users" });
  const { users } = useLoaderData();
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  return (
    <>
      <div>
        <Button type="button" onClick={() => setOpen(true)}>
          {t("upload")}
        </Button>
        <UploadUsersDialog open={open} onClose={() => setOpen(false)} />
      </div>
      <table>
        <thead>
          <tr>
            <th>{t("email")}</th>
            <th>{t("establishment")}</th>
            <th>{t("role")}</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <FormControl fullWidth>
                    <Select value={0}>
                      <MenuItem value={0}>Establishment 0</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl fullWidth>
                    <Select
                      multiple
                      value={roles}
                      onChange={(e) => setRoles(e.target.value)}
                    >
                      <MenuItem value={"admin"}>{t("admin")}</MenuItem>
                      <MenuItem value={"manager"}>{t("manager")}</MenuItem>
                      <MenuItem value={"expert"}>{t("expert")}</MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
