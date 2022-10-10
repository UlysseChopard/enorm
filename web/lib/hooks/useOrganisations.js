import useSWR from "swr";

const useOrganisations = (cond = true) => {
  const { data, error } = useSWR(
    cond ? "http://localhost:4000/api/organisations" : null
  );

  return {
    organisations: data?.organisations,
    isLoading: !error && !data?.organisations,
    isError: error,
  };
};

export default useOrganisations;
