import useSWR from "swr";
import fetcher from "lib/fetcher";

const useUser = () => {
  const { data, error } = useSWR("http://localhost:4000/api/users", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
