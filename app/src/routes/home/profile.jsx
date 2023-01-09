import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import { get } from "@/api/accounts";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack";

export async function loader() {
  const res = await get();
  if (!res.ok) throw Error("Could not fetch your informations");
  return res.json();
}

const CATEGORIES = [
  {
    name: "id",
    children: ["firstname", "lastname", "gender"]
  },
  {
    name: "company",
    children: ["name", "address", "sponsor"]
  },
  {
    name: "contact",
    children: ["email", "cell", "phone"]
  }
];

export default function Profile() {
  const { user } = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "profile" });
  return (
    <Stack spacing={2}>
      {CATEGORIES.map(({ name, children }) => (
        <Paper variant="outlined" key={name}>
          <Typography>{t(name)}</Typography>
        </Paper>
      ))}
    </Stack>
);
}
