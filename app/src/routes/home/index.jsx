import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { get } from "@/api/accounts";
import LeftNavbar from "@/components/LeftNavbar";

export async function loader() {
  const account = localStorage.getItem("account");
  const res = await get(account);
  if (!res.ok) return redirect("/login");
  return res.json();
}

export default function Home() {
  const { account, users } = useLoaderData();
  const [organisation, setOrganisation] = useState(users[0].organisation_id);
  if (!localStorage.getItem("organisation"))
    localStorage.setItem("organisation", organisation);
  const handleChange = (e) => {
    localStorage.setItem("organisation", e.target.value);
    setOrganisation(e.target.value);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LeftNavbar user={account} />
      <AppBar position="absolute">
        <Toolbar
          sx={{
            backgroundColor: "#0a4987",
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Select
            sx={{
              backgroundColor: "white",
              ":hover": { backgroundColor: "white", opacity: 0.8 },
              ":selected": { backgroundColor: "white" },
            }}
            value={organisation}
            onChange={handleChange}
            variant="filled"
          >
            {users.map(({ organisation_id, name }) => (
              <MenuItem key={organisation_id} value={organisation_id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          left: 240,
          position: "absolute",
          right: 0,
          top: "100px",
          width: "initial",
        }}
      >
        <Outlet />
      </Container>
    </LocalizationProvider>
  );
}
