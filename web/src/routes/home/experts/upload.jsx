import { redirect, Form, Link } from "react-router-dom";
import { uploadExperts } from "../../../api/experts";
import StyledInput from "../../../components/StyledInput";

export async function action({ request }) {
  const file = await request.formData();
  await uploadExperts(file);
  return redirect("/experts");
}

export default function UploadExperts() {
  return (
    <dialog open>
      <Form method="POST" encType="multipart/form-data">
        <StyledInput type="file" label="CSV file to upload" name="file" />
        <Link to="/experts">Cancel</Link>
        <button type="submit">Upload</button>
      </Form>
    </dialog>
  );
}
