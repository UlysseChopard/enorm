import { useLoaderData } from "react-router-dom";
import { getById } from "@/api/groups";

export const loader = async ({ params }) => {
  const res = await getById(params.id);
  return res.ok ? res.json() : res.status;
};

export const action = () => {};

const Groups = () => {
  const group = useLoaderData();
  return <p>{JSON.stringify(group, null, 4)}</p>;
};

export default Groups;
