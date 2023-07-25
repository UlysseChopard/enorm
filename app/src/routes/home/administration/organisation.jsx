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
import { getOrganisation, updateOrganisation } from "@/api/administration";

export async function loader() {
  const res = await getOrganisation();
  return res.ok ? res.json() : res.status;
}

export async function action({ request }) {
  const formData = await request.formData();
  const res = await updateOrganisation(
    formData.get("id"),
    formData.get("name")
  );
  return res.ok ? res.json() : res.status;
}

export default function Organisation() {
  const { t } = useTranslation(null, { keyPrefix: "organisation" });
  const { organisation } = useLoaderData();
  return (
    <Form method="POST">
      <TextField name="name" defaultValue={organisation.name} />
      <input type="hidden" name="id" value={organisation.id} />
      <Button type="submit">{t("submit")}</Button>
    </Form>
  );
}
