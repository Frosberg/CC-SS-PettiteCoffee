import { useEffect, useRef } from "react";
import "./Toast.css";

type ToastProps = {
    isOpen: boolean;
    title: string;
    message: string;
    type?: ToastType;
    duration?: number;
    onClose?: () => void;
};

function Toast({ isOpen, title, message, type = "success", duration = 4000, onClose }: ToastProps) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!isOpen) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }

            return;
        }

        timerRef.current = setTimeout(() => {
            onClose?.();
            timerRef.current = null;
        }, duration);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    const role = type === "success" ? "status" : "alert";
    const ariaLive = type === "success" ? "polite" : "assertive";

    return (
        <div className={`toast_custom toast_custom--${type}`} role={role} aria-live={ariaLive}>
            <div className="toast__body">
                <strong>{title}</strong>
                <p>{message}</p>
            </div>
            <button
                type="button"
                className="toast__close"
                aria-label="Cerrar notificación"
                onClick={() => onClose?.()}
            >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
        </div>
    );
}

export default Toast;
