import { useState, useEffect } from "react";
import {
  getSortedRowModel,
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
import {
  get,
  create,
  setVisibility,
  setRegistrationsOpenness,
} from "@/api/groups";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export async function loader() {
  const res = await get();
  if (!res.ok) return false;
  return res.json();
}

export async function action({ request }) {
  const formData = await request.formData();
  const group = Object.fromEntries(formData);

  const res = await create(group);
  if (!res.ok) return res.status;
  return res.json();
}

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
            <TextField required label={t("label")} name="title" fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("cancel")}</Button>
          <Button variant="contained" type="submit">
            {t("submit")}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

const createColumns = (t) => [
  {
    accessorKey: "email",
    header: t("sponsor"),
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    accessorKey: "organisation",
    header: t("organisation"),
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    accessorKey: "reference",
    header: t("reference"),
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    accessorKey: "title",
    header: t("label"),
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    id: "created_at",
    accessorFn: (row) => new Date(row.created_at).toLocaleDateString(),
    header: t("creation"),
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    accessorKey: "disbanded_at",
    header: t("disbanding"),
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    accessorKey: "open",
    cell: (cell) =>
      cell.getValue() ? (
        <CheckCircleOutlineOutlinedIcon
          style={{ margin: "0 50%" }}
          onClick={() => setRegistrationsOpenness(cell.row.id, false)}
        />
      ) : (
        <DoNotDisturbOnOutlinedIcon
          style={{ margin: "0 50%" }}
          onClick={() => setRegistrationsOpenness(cell.row.id, true)}
        />
      ),
    header: t("openness"),
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    accessorKey: "visible",
    cell: (cell) =>
      cell.getValue() ? (
        <VisibilityOutlinedIcon
          style={{ margin: "0 50%" }}
          onClick={() => setVisibility(cell.row.id, false)}
        />
      ) : (
        <VisibilityOffOutlinedIcon
          style={{ margin: "0 50%" }}
          onClick={() => setVisibility(cell.row.id, true)}
        />
      ),
    header: t("visibility"),
    enableSorting: true,
    sortingFn: "basic",
  },
];

export default function Groups() {
  const { groups } = useLoaderData();
  const createdGroup = useActionData();
  const [sorting, setSorting] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const { t } = useTranslation(null, { keyPrefix: "groups" });
  const columns = createColumns(t);
  const table = useReactTable({
    data: groups,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    if (createdGroup?.group) setCreateModal(false);
  }, [createdGroup]);

  return (
    <>
      <div style={{ margin: "0 1rem 1rem" }}>
        <Button variant="contained" onClick={() => setCreateModal(true)}>
          {t("create")}
        </Button>
      </div>
      <table style={{ width: "100%" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {" "}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
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
      <CreateModal open={createModal} onClose={() => setCreateModal(false)} />
    </>
  );
}
