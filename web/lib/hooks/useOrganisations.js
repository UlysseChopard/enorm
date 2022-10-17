import useSWR from "swr";

const useOrganisations = (cond = true) => {
  const { data, error } = useSWR(
    cond ? `${process.env.NEXT_PUBLIC_API_URL}/organisations` : null
  );

  return {
    organisations: data?.organisations,
    isLoading: !error && !data?.organisations,
    isError: error,
  };
};

export default useOrganisations;
