import useSWR from "swr";

const useUser = (cond = true) => {
  const { data, error } = useSWR(
    cond ? "http://localhost:4000/api/user" : null
  );
  return {
    isLoading: !error && !data,
    isError: error,
    user: data?.user,
  };
};

export default useUser;
