import { useRouter } from "next/router";

const Back = () => {
  const router = useRouter();
  return (
    <div className="fixed top-20 left-20 rounded-full w-8 h-8 text-center leading-8 border bg-slate-200 hover:text-white hover:bg-slate-600 focus:bg-slate-600">
      <button
        type="button"
        onClick={router.back}
        className="relative bottom-0.5 text-xl"
      >
        &larr;
      </button>
    </div>
  );
};

export default Back;
