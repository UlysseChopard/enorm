import Input from "components/forms/Input";
import Checkboxes from "components/forms/Checkboxes";
import Submit from "components/forms/Submit";

const Signup = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col w-96 border rounded-xl p-4">
            <Input name="first-name" label="First name" autoComplete="given-name" />
            <Input name="last-name" label="Last name" autoComplete="family-name" />
            <Input name="email" label="Email" type="email" autoComplete="email" />
            <Input name="password" label="Password" type="password" autoComplete="new-password" />        
            <Input name="organisation" label="Organisation" />
            <Checkboxes name="role" label="Roles" options={[{ label: "Manager", value: "manager"}, { label: "Expert", value: "expert", checked: true }]} />
            <Submit label="Sign up" />
        </form>
    );
}

export default Signup;