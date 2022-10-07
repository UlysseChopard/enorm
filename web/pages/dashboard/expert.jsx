import Button from "components/forms/Button";
import ExpertLayout from "components/layout/Expert";
import useUser from "lib/hooks/useUser";
import FillProfile from "components/pages/expert/FillProfile";

const Expert = () => {
  const { user, isLoading, isError } = useUser();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred, please try to log in</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold my-4">{`Hi ${user.first_name} !`}</h1>
      {!form && (
        <>
          <Button
            label="Fill my informations"
            onClick={() => setForm("infos")}
          />
        </>
      )}
      {form === "infos" && (
        <FillProfile onSuccess={goToDashboard} onCancel={goToDashboard} />
      )}
    </>
  );
};

Expert.Layout = ExpertLayout;

export default Expert;
