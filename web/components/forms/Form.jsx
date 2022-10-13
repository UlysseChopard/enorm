import Cancel from "./Cancel";
import Submit from "./Submit";
import { useRouter } from "next/router";

const Form = ({ onSubmit, children, onCancel, submitLabel }) => {
  const router = useRouter();
  let i = 0;
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col flex-wrap w-96 border rounded-xl p-4 m-4 text-left drop-shadow bg-slate-100"
      method="post"
    >
      {children.map((child) => {
        i += 1;
        return (
          <div key={i} className="flex flex-col justify-between w-full mb-2">
            {child}
          </div>
        );
      })}
      <div className="flex items-center justify-around">
        <Cancel onClick={onCancel || router.back} />
        <Submit label={submitLabel} />
      </div>
    </form>
  );
};

export default Form;