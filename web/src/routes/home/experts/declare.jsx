import { Link, redirect, Form } from "react-router-dom";
import StyledInput from "../../../components/StyledInput";
import { declareExpert } from "../../../api/experts";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  await declareExpert(email);
  return redirect("/experts");
}

export default function DeclareExpert() {
  return (
    <dialog open className="absolute w-full h-full bg-slate-100 opacity-7">
      <Form method="post">
        <StyledInput label="Expert email adress" name="email" />
        <Link to="/experts">Cancel</Link>
        <button type="submit">Add expert</button>
      </Form>
    </dialog>
  );
}
