import { useRouter } from "next/router";
import useUser from "lib/hooks/useUser";

const WaitingPage = () => {
  const router = useRouter();
  const { user, isError, isLoading } = useUser();
  if (isError) return <p>Please verify your account</p>;
  if (isLoading) return <p>Loading...</p>;
  if (user.is_manager) router.push("/dashboard/manager");
  if (user.is_expert) router.push("/dashboard/expert");
};

export default WaitingPage;
