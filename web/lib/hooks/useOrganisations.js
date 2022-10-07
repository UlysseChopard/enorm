import useSWR from "swr";

const useOrganisations = () => {
  const { data, error } = useSWR("http://localhost:4000/api/organisations");

  return {
    organisations: data?.organisations,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useOrganisations;
