import useSWR from "swr";

const useEmailValidation = ({ uuid }) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/confirm/${uuid}`
  );
  return {
    validated: data?.user,
    isLoading: !error && !data?.user,
    isError: error,
  };
};

export default useEmailValidation;
