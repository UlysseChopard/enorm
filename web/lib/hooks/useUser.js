import useSWR from "swr";

const useUser = (cond = true) => {
  const { data, error } = useSWR(
    cond ? `${process.env.NEXT_PUBLIC_API_URL}/user` : null
  );
  return {
    isLoading: !error && !data?.user,
    isError: error,
    user: data?.user,
  };
};

export default useUser;
