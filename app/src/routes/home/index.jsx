import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { get } from "@/api/accounts";
import LeftNavbar from "@/components/LeftNavbar";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export async function loader() {
  const account = localStorage.getItem("account");
  const res = await get(account);
  if (!res.ok) return redirect("/login");
  return res.json();
}

export default function Home() {
  const { account } = useLoaderData();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LeftNavbar user={account} />
      <Container
        sx={{
          left: 240,
          position: "absolute",
          top: 24,
          right: 0,
          width: "initial",
        }}
      >
        <Outlet />
      </Container>
    </LocalizationProvider>
  );
}
