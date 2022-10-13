import useSWR from "swr";

const useEmailValidation = ({ uuid }) => {
  const { data, error } = useSWR(`http://localhost:4000/api/confirm/${uuid}`);

  return {
    validated: data?.user,
    isLoading: !error && !data?.user,
    isError: error,
  };
};

export default useEmailValidation;
