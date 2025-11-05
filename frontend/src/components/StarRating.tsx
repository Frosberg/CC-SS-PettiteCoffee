import { useState, useRef } from "react";
import "./StarRating.css";

type Props = {
    max?: number;
    onChange?: (value: number) => void;
    value?: number;
    readonly?: boolean;
};

function StarRating({ max = 5, onChange, value = 0, readonly = false }: Props) {
    const [rating, setRating] = useState(value);
    const [hover, setHover] = useState(0);
    const starsRef = useRef<(HTMLSpanElement | null)[]>([]);

    const triggerPop = (index: number) => {
        const el = starsRef.current[index];
        if (!el) return;
        el.classList.remove("pop");
        void el.offsetWidth;
        el.classList.add("pop");
    };

    const handleClick = (val: number, index: number) => {
        if (readonly) return;
        setRating(val);
        onChange?.(val);
        triggerPop(index);
    };

    return (
        <div className={`star-rating ${readonly ? "readonly" : ""}`}>
            {Array.from({ length: max }, (_, index) => {
                const val = index + 1;
                const active = val <= (hover || rating);

                return (
                    <span
                        key={index}
                        ref={(el: HTMLSpanElement | null) => {
                            starsRef.current[index] = el;
                        }}
                        onClick={() => handleClick(val, index)}
                        onMouseEnter={() => !readonly && setHover(val)}
                        onMouseLeave={() => !readonly && setHover(0)}
                    >
                        <i className={`fa-star ${active ? "fa-solid" : "fa-regular"}`}></i>
                    </span>
                );
            })}
        </div>
    );
}

export default StarRating;
