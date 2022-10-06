import Button from "components/forms/Button";

export const RolesButtons = () => {
  return (
    <>
      <Button href="/dashboard/expert" label="Expert" role="expert" />
      <Button href="/dashboard/manager" label="Manager" role="manager" />
    </>
  );
};
