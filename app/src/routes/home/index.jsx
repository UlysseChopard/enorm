import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { get } from "@/api/accounts";
import LeftNavbar from "@/components/LeftNavbar";
import Container from "@mui/material/Container";

export async function loader() {
  const res = await get();
  if (!res.ok) return redirect("/login");
  return res.json();
}

export default function Home() {
  const { account } = useLoaderData();
  return (
    <>
      <LeftNavbar user={account} />
      <Container sx={{ left: 240, position: "fixed", top: 24 }} >
        <Outlet />
      </Container>
    </>
  );
}
