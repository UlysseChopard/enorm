import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Form, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { get, create } from "@/api/groups";

export async function loader() {
 const res = await get();
 if (!res.ok) return false;
 return res.json(); 
};

export async function action ({ request }) {
  const formData = await request.formData();
  const group = Object.fromEntries(formData);
  const res = await create(group);
  return res.ok;
};

const CreateModal = ({ open, onClose }) => {
  const { t } = useTranslation(null, { keyPrefix: "groups" });
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="post" autoComplete="on">
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("text")}</DialogContentText>
          <Stack spacing={2}>
            <TextField
              required
              label={t("organisation")}
              name="organisation"
              fullWidth
            />
            <TextField
              required
              label={t("reference")}
              name="reference"
              fullWidth
            />
            <TextField
              required
              label={t("label")}
              name="title"
              fullWidth
            />
          </Stack>
        </DialogContent> 
        <DialogActions>
          <Button onClick={onClose}>{t("cancel")}</Button>
          <Button variant="contained" type="submit">{t("submit")}</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

const createColumns = (t) => ([
  {
    accessorKey: "member",
    header: t("member")
  },
  {
    accessorFn: (row) => `${row.tc || ""} ${row.wg || ""}`,
    header: t("reference"),
  },
  {
    accessorKey: "label",
    header: t("label")
  },
  {
    accessorKey: "start",
    header: t("creation"),
  },
  {
    accessorKey: "end",
    header: t("disbanding"),
  },
  {
    accessorKey: "status",
    header: t("status")
  },
  {
    accessorKey: "visibility",
    header: t("visibility")
  }
]);

export default function Groups() {
  const groups  = useLoaderData();
  const createdGroup = useActionData();
  const [createModal, setCreateModal] = useState(false);
  const { t } = useTranslation(null, { keyPrefix: "groups" });
  const columns = createColumns(t);
  const table = useReactTable({ data: groups, columns, getCoreRowModel: getCoreRowModel() });
  if (createdGroup) setCreateModal(false);
  return (
    <>
      <Button variant="contained" onClick={() => setCreateModal(true)}>{t("create")}</Button>
      <CreateModal open={createModal} onClose={() => setCreateModal(false)} />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
}

