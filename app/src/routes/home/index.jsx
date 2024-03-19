import { useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
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
import { get as getSubscriptions } from "@/api/organisations/subscriptions";
import { get as getRegistrations } from "@/api/organisations/registrations";

export async function loader() {
  const storedAccount = localStorage.getItem("account");
  if (!storedAccount) return redirect("/login");
  const res = await get(storedAccount);
  if (!res.ok) return redirect("/login");
  const { account } = await res.json();
  if (!account.organisations.length) {
    throw new Error("Missing organisations for account");
  }
  const currentOrganisation = parseInt(localStorage.getItem("organisation"));
  const accountOrganisation = account.organisations.find(
    ({ id }) => id === currentOrganisation,
  );
  if (isNaN(currentOrganisation) || !accountOrganisation) {
    localStorage.setItem("organisation", account.organisations[0].id);
    localStorage.setItem(
      "roles",
      JSON.stringify(account.organisations[0].roles),
    );
  } else {
    localStorage.setItem("roles", JSON.stringify(accountOrganisation.roles));
  }
  const requests = await Promise.all([getSubscriptions(), getRegistrations()]);
  const [{ sent, received }, { registrations }] = await Promise.all(
    requests.map((r) => r.json()),
  );
  const actionNb = {
    subscriptions: sent.length + received.length,
    registrations: registrations.filter(
      (r) => !r.denied_at && !r.accepted_at && !r.forwarded,
    ).length,
  };
  return { account, actionNb };
}

export default function Home() {
  const { account, actionNb } = useLoaderData();
  const navigate = useNavigate();
  const [organisation, setOrganisation] = useState(
    localStorage.getItem("organisation"),
  );
  const handleChange = (e) => {
    navigate(0);
    setOrganisation(e.target.value);
    localStorage.setItem("organisation", e.target.value);
    localStorage.setItem(
      "roles",
      JSON.stringify(
        account.organisations.find(({ id }) => id === e.target.value).roles,
      ),
    );
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LeftNavbar user={account} actionNb={actionNb} />
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
              {account.organisations.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          left: 230,
          position: "absolute",
          right: 0,
          top: 80,
          width: "initial",
        }}
      >
        <Outlet />
      </Container>
    </LocalizationProvider>
  );
}
