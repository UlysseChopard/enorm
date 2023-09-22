// import { Form, redirect, useAction } from "react-router-dom";
import { getAll } from "@/api/admin";

export const loader = async () => {
  const res = await getAll();
  return res.ok ? res.json() : res.status;
};

export const action = async () => {
  return null;
};

const Admin = () => {
  return <p>Test</p>;
};

export default Admin;
