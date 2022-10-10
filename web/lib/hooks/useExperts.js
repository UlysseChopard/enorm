import useSWR from "swr";

const useExperts = (cond = true) => {
  const { data, error } = useSWR(
    cond ? "http://localhost:4000/api/experts" : null
  );

  return {
    experts: data?.experts,
    isLoading: !error && !data?.experts,
    isError: error,
  };
};

export default useExperts;
