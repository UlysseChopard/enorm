import useEmailValidation from "lib/hooks/useEmailValidation";
import Link from "next/link";
import { useRouter } from "next/router";

const NEXT_PAGE = "/dashboard/manager";

const ConfirmPage = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { validated, isError } = useEmailValidation({ uuid });
  if (validated) router.push(NEXT_PAGE);
  if (isError) return <p>An error occurred, please try again</p>;
  return (
    <div>
      <p>Thank you for signing up to E-norm. You will be redirected soon</p>
      <p>
        If you were not within some tens of seconds, please click{" "}
        <Link href={NEXT_PAGE}>here</Link>
      </p>
    </div>
  );
};

export default ConfirmPage;
