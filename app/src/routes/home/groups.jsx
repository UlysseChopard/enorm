import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Form, useSubmit } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import { get } from "@/api/registrations";
import { useLoaderData } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log(Object.entries(formData));
  return formData;
};
// const data = [
//   {
//     id: 0,
//     member: "me",
//     tc: "XXX/TC",
//     wg: "XXX/WG1",
//     label: "Blablabla",
//     start: "10/05/2017",
//     end: "31/12/2023",
//     status: "active"
//   },
//   {
//     id: 1,
//     member: "me",
//     tc: "XXX/TC",
//     wg: "XXX/WG32",
//     label: "Blablabla",
//     start: null,
//     end: "31/12/2023",
//     status: "denied"
//   } 
// ];

const CreateModal = ({ open, onClose }) => {
  const { t } = useTranslation(null, { keyPrefix: "groups" });
  const [group, setGroup] = useState({
    organisation: "",
    reference: "",
    title: "",
    establishmentDate: new Date(),
    disbandingDate: new Date(),
    status: "active",
    visibility: "hidden"
  });  
  const submit = useSubmit();
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="post" autoComplete="on" onSubmit={() => submit(group)}>
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("text")}</DialogContentText>
          <Stack spacing={2}>
            <TextField
              required
              label={t("organisation")}
              value={group.organisation}
              onChange={e => setGroup({ ...group, organisation: e.target.value })}
              fullWidth
            />
            <TextField
              required
              label={t("reference")}
              value={group.reference}
              onChange={e => setGroup({ ...group, reference: e.target.value })}
              fullWidth
            />
            <TextField
              required
              label={t("title")}
              value={group.title}
              onChange={e => setGroup({ ...group, title: e.target.value })}
              fullWidth
            />
            <DatePicker
              label={t("establishmentDate")}
              value={group.establishmentDate}
              onChange={e => setGroup({ ...group, establishmentDate: e.target.value })}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label={t("disbandingDate")}
              value={group.disbandingDate}
              onChange={e => setGroup({ ...group, disbandingDate: e.target.value })}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              required
              label={t("status")}
              value={group.status}
              onChange={e => setGroup({ ...group, status: e.target.value })}
              select
              fullWidth
            >
              <MenuItem value="active">{t("active")}</MenuItem>
              <MenuItem value="disbanded">{t("disbanded")}</MenuItem>
              <MenuItem value="dormant">{t("dormant")}</MenuItem>
            </TextField>
            <TextField
              required
              label={t("visibility")}
              value={group.visibility}
              onChange={e => setGroup({ ...group, visibility: e.target.value })}
              select
              fullWidth
            >
              <MenuItem value="visible">{t("visible")}</MenuItem>
              <MenuItem value="hidden">{t("hidden")}</MenuItem>
            </TextField>
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
    header: t("since"),
  },
  {
    accessorKey: "end",
    header: t("expiration"),
  },
  {
    accessorKey: "status",
    header: t("status")
  }
]);

export async function loader() {
 const res = await get();
 if (!res.ok) return false;
 return res.json(); 
};

export default function HeadlessRegistrations() {
  const { registrations: data } = useLoaderData();
  const [createModal, setCreateModal] = useState(false);
  const { t } = useTranslation(null, { keyPrefix: "groups" });
  const columns = createColumns(t);
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
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

