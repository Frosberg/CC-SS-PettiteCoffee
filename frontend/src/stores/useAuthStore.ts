import { create } from "zustand";
import { ApiRequest } from "../services/ApiRequest";
import { AxiosError } from "axios";

const useAuthStore = create<AuthStore>((set) => ({
    token: null,
    user: null,
    error: null,
    register: async (email, password) => {
        try {
            const credentials = { username: email, password };
            const { data } = await ApiRequest.post("/auth/register", credentials);
            const saveData = { user: data.username, token: data.token };
            window.localStorage.setItem("session", JSON.stringify(saveData));
            set({ ...saveData, error: null });
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.response?.data });
            }
        }
    },
    login: async (email, password) => {
        try {
            const credentials = { username: email, password };
            const { data } = await ApiRequest.post("/auth/login", credentials);
            const saveData = { user: data.username, token: data.token };
            window.localStorage.setItem("session", JSON.stringify(saveData));
            set({ ...saveData, error: null });
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.response?.data });
            }
        }
    },
    logout: async () => {
        try {
            await ApiRequest.post("/auth/logout");
        } catch (error) {
            console.log(error);
        }
        window.localStorage.removeItem("session");
        set({ token: null, user: null, error: null });
    },

    setSession: ({ user, token }) => {
        set({ user, token });
    },
}));

export default useAuthStore;
