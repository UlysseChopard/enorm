import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActionData, useSubmit } from "react-router-dom";
import { search } from "@/api/subscriptions";
import TextField from "@mui/material/TextField";

export async function action({ request }) {
  const formData = await request.formData();
  const objData = Object.fromEntries(formData);
  const res = await search(objData);
  if (!res.ok) return res.status;
  return res.json();
}

export default function Subscriptions() {
  const res = useActionData();
  const { t } = useTranslation(null, { keyPrefix: "subscriptions" });
  const submit = useSubmit();
  const [search, setSearch] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    clearTimeout(search);
    if (query) {
      setSearch(
        setTimeout(() => submit({ text: query }, { method: "post" }), 300)
      );
    }
  }, [query, search, submit]);
  return (
    <TextField
      id="text"
      name="text"
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
