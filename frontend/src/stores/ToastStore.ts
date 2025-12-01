import { create } from "zustand";

const ToastStore = create<ToastStore>((set) => ({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
    duration: 4000,
    showToast: ({ title, message, type = "success", duration = 4000 }) =>
        set({
            isOpen: true,
            title,
            message,
            type,
            duration,
        }),
    closeToast: () =>
        set((state) => {
            if (!state.isOpen) return state;
            return {
                ...state,
                isOpen: false,
            };
        }),
}));

export default ToastStore;
