import { useState } from "react";
import "./ViewInfoUser.css";

type Props = {
    title: string;
    value: string | undefined;
    editable?: boolean;
    onChange?: (newValue: string) => void;
};

function ViewInfoUser({ title, value, editable = false, onChange }: Props) {
    const [localValue, setLocalValue] = useState(value || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
        if (onChange) onChange(e.target.value);
    };

    return (
        <div className="perfil_input">
            <h4 className="perfil_input__title">{title}</h4>
            {editable ? (
                <input
                    type="text"
                    className="perfil_input__input"
                    value={localValue}
                    onChange={handleChange}
                />
            ) : (
                <p className="perfil_input__value">{value || ""}</p>
            )}
        </div>
    );
}

export default ViewInfoUser;
