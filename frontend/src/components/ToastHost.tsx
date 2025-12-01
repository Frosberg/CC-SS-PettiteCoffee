import Toast from "./Toast";
import ToastStore from "../stores/ToastStore";

function ToastHost() {
    const { isOpen, title, message, type, duration, closeToast } = ToastStore((state) => state);

    return (
        <Toast
            isOpen={isOpen}
            title={title}
            message={message}
            type={type}
            duration={duration}
            onClose={closeToast}
        />
    );
}

export default ToastHost;
