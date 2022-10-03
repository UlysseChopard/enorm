const Select = ({ label, name, options, multiple = false, required = true }) => {
    return (<div className="flex flex-col justify-between w-full" > 
        <label for={name} className="text-2xl font-bold">{label}</label>
        <select id={name} name={name} multiple={multiple} required={required} className="text-xl">
            {options.map(opt => (<option value={opt.value}>{opt.label}</option>))}
        </select>
        </div>)
};

export default Select;