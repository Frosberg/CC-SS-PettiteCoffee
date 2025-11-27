import type { MouseEvent } from "react";
import "./ScrollTopButton.css";

function ScrollTopButton() {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            type="button"
            className="scroll-top"
            aria-label="Ir al inicio"
            onClick={handleClick}
        >
            <i className="fa-solid fa-arrow-up"></i>
        </button>
    );
}

export default ScrollTopButton;

