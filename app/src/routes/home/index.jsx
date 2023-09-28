import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import LeftNavbar from "@/components/LeftNavbar";
import { get } from "@/api/accounts";

export async function loader() {
  const account = localStorage.getItem("account");
  const res = await get(account);
  if (!res.ok) return redirect("/login");
  return res.json();
}

export default function Home() {
  const { account } = useLoaderData();
  const [organisation, setOrganisation] = useState(account.organisations?.[0]);
  if (organisation && !localStorage.getItem("organisation")) {
    localStorage.setItem("organisation", organisation);
  }
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
            backgroundColor: "#073B6E",
          }}
          disableGutters
          variant="dense"
        >
          <FormControl
            sx={{
              m: 1,
              minWidth: 120,
              position: "absolute",
              right: 0,
            }}
            size="small"
          >
            <Select
              sx={{
                backgroundColor: "#e7f1fc",
              }}
              value={organisation}
              onChange={handleChange}
            >
              {account.organisations.map(({ organisation_id, name }) => (
                <MenuItem key={organisation_id} value={organisation_id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
