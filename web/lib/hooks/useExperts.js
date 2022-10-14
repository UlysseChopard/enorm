import useSWR from "swr";

const useExperts = (cond = true) => {
  const { data, error } = useSWR(
    cond ? `${process.env.NEXT_PUBLIC_API_URL}/experts` : null,
    { refreshInterval: 2000 }
  );

  return {
    experts: data?.experts,
    isLoading: !error && !data?.experts,
    isError: error,
  };
};

export default useExperts;
