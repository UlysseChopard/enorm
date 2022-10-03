const Checkboxes = ({ options, name, label }) => {
    return (
        <div className="flex flex-col justify-between w-full mb-2">
            <fieldset className="border rounded p-2 flex flex-col items-center">
                <legend className="text-2xl font-bold">{label}</legend>
                {options.map(opt =>(<div key={opt.value} className="w-32">
                    <input className="text-xl m-2" type="checkbox" name={name} id={opt.value} value={opt.value} defaultChecked={opt.checked}/>
                    <label htmlFor={opt.value}>{opt.label}</label>
                </div>))}
            </fieldset>
        </div>
    );
}

export default Checkboxes;