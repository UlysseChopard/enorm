const Input = ({ name, type = "text", autoComplete = "on", label, required = true }) => {
    return (
    <div className="flex flex-col justify-between w-full mb-2" >
        <label htmlFor={name} className="text-2xl font-bold mb-2">
                {label}
        </label>  
        <input className="text-xl p-2" id={name} name={name} type={type} autoComplete={autoComplete} required={required} />
    </div>);
}

export default Input;