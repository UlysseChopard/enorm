import useUser from "lib/hooks/useUser";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/users", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p>
        <a href="http://localhost:4000/api/logout">
          An error occured, please try again
        </a>
        <code>{JSON.stringify(isError, null, 2)}</code>
      </p>
    );

  return (
    <>
      <h1>Dashboard</h1>
      <code>{JSON.stringify(data, null, 2)}</code>;
    </>
  );
};

export default Dashboard;
