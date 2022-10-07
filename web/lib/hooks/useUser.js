import useSWR from "swr";

const useUser = () => {
  const { data, error } = useSWR("http://localhost:4000/api/user");

  return {
    user: data?.user,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
