import "./CustomInput.css";

type Option = {
    label: string;
    value: string | number;
};

type CustomSelectProps<T extends string | number = string> = {
    label?: string;
    name: string;
    value: T;
    onChange: (value: T) => void;
    options: Option[];
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
};

function CustomSelect<T extends string | number = string>({
    label,
    name,
    value,
    onChange,
    options,
    placeholder,
    disabled,
    required,
}: CustomSelectProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value as T;
        onChange(val);
    };

    return (
        <div className="custom_input">
            {label && (
                <label htmlFor={name} className="custom_input__label">
                    {label}
                </label>
            )}

            <select
                id={name}
                className="custom_input__input"
                value={value}
                onChange={handleChange}
                disabled={disabled}
                required={required}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CustomSelect;
