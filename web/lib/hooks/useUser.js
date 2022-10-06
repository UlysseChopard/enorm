import useSWR from "swr";

const useUser = () => {
  const { data, error } = useSWR("http://localhost:4000/api/users");

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
