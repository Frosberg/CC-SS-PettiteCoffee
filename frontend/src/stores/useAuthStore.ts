import { create } from "zustand";
import { ApiRequest } from "../services/ApiRequest";
import { AxiosError } from "axios";

const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    email: null,
    error: null,
    register: async (email, password) => {
        try {
            const credentials = { username: email, password };
            const { data } = await ApiRequest.post("/auth/register", credentials);
            window.localStorage.setItem("session", JSON.stringify(data.loginData));
            set({ user: data.loginData, error: null });
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
            window.localStorage.setItem("session", JSON.stringify(data.loginData));
            set({ user: data.loginData, error: null });
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
        set({ user: null, error: null });
    },
    setSession: (user) => {
        set({ user });
    },
    setRecovery: async ({ email }) => {
        try {
            const credentials = { email };
            const data = await ApiRequest.post("/auth/recuperar", credentials);
            if (data.status === 200) {
                set({ email });
                return true;
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.response?.data });
            }
        }

        return false;
    },
    setChangePassword: async ({ password, token }) => {
        try {
            const credentials = { email: get().email, token, nuevaPassword: password };
            const { data } = await ApiRequest.post("/auth/cambiar-password", credentials);

            if (!data.valido) {
                set({ error: data.mensaje });
                return false;
            } else {
                set({ email: null, error: null });
                return true;
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.response?.data });
            }
            return false;
        }
    },
}));

export default useAuthStore;
