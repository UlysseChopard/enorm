import Button from "components/forms/Button";
import Link from "next/link";

export const RolesButtons = () => {
  return (
    <>
      <Link href="/dashboard/expert">
        <Button onClick={console.log} label="Expert" role="expert" />
      </Link>
      <Link href="/dashboard/manager">
        <Button onClick={console.log} label="Manager" role="manager" />
      </Link>
    </>
  );
};
