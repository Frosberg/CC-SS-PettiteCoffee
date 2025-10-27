import "./CustomInput.css";

type Props = {
    placeholder: string;
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
};

function CustomInput({ placeholder, label, value, name, onChange }: Props) {
    return (
        <div className="custom_input">
            <label className="custom_input__label" htmlFor={name}>
                {label}
            </label>
            <input
                className="custom_input__input"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default CustomInput;
