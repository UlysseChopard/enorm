import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { get } from "@/api/registrations";
import { useLoaderData } from "react-router-dom";

const data = [
  {
    id: 0,
    member: "me",
    tc: "XXX/TC",
    wg: "XXX/WG1",
    label: "Blablabla",
    start: "10/05/2017",
    end: "31/12/2023",
    status: "active"
  },
  {
    id: 1,
    member: "me",
    tc: "XXX/TC",
    wg: "XXX/WG32",
    label: "Blablabla",
    start: null,
    end: "31/12/2023",
    status: "denied"
  } 
];

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
  const { t } = useTranslation(null, { keyPrefix: "registrations" });
  const columns = createColumns(t);
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <div>
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
    </div>
  );
}

