import "./CustomInput.css";

type CustomInputProps<T extends string | number = string> = {
    label?: string;
    name: string;
    placeholder?: string;
    type?: "text" | "number" | "date" | "textarea";
    value: T;
    onChange: (value: T) => void;
    disabled?: boolean;
    required?: boolean;
    step?: string;
};

function CustomInput<T extends string | number = string>({
    label,
    name,
    placeholder,
    type = "text",
    value,
    onChange,
    disabled,
    required,
    step,
}: CustomInputProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (type === "number") {
            const inputVal = e.target.value;
            const parsedVal = inputVal === "" ? ("" as T) : (parseFloat(inputVal) as T);
            onChange(parsedVal);
        } else {
            onChange(e.target.value as T);
        }
    };

    return (
        <div className="custom_input">
            {label && (
                <label htmlFor={name} className="custom_input__label">
                    {label}
                </label>
            )}

            {type === "textarea" ? (
                <textarea
                    id={name}
                    className="custom_input__input custom_input__textarea"
                    placeholder={placeholder}
                    value={value as string}
                    onChange={handleChange}
                    disabled={disabled}
                    required={required}
                />
            ) : (
                <input
                    id={name}
                    type={type}
                    className="custom_input__input"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    required={required}
                    step={type === "number" ? step || "0.01" : undefined}
                />
            )}
        </div>
    );
}

export default CustomInput;
