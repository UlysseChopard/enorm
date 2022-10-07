import useSWR from "swr";

const useOrganisations = () => {
  const { data, error } = useSWR("http://localhost:4000/api/organisations");

  console.log("organisations", data);

  return {
    organisations: data?.organisations,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useOrganisations;
