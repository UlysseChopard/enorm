import { Outlet, redirect, useLoaderData } from "react-router-dom";
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
  const storedAccount = localStorage.getItem("account");
  const res = await get(storedAccount);
  if (!res.ok) return redirect("/login");
  const { account } = await res.json();
  const storedOrganisation = localStorage.getItem("organisation");
  if (
    !account.superuser &&
    (!storedOrganisation || !account.organisations.includes(storedOrganisation))
  ) {
    localStorage.setItem("organisation", account.organisations[0].id);
  }
  const currentOrganisation = localStorage.getItem("organisation");
  const roles = account.organisations.find(
    ({ id }) => id === currentOrganisation
  ).roles;
  localStorage.setItem("roles", roles);

  return { account };
}

export default function Home() {
  const { account } = useLoaderData();
  const handleChange = (e) => {
    localStorage.setItem("organisation", e.target.value);
    localStorage.setItem(
      "roles",
      account.organisations.find(({ id }) => id === e.target.value).roles
    );
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
              value={localStorage.getItem("organisation")}
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
