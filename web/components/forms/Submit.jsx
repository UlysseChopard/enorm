const Submit = ({ label = "submit" }) => {
    return (<button className="text-2xl bg-orange-200 rounded p-4 hover:text-blue-600 focus:text-blue-600" type="submit">{label}</button>)
};

export default Submit;