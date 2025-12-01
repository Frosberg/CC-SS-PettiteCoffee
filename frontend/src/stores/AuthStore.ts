import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    RequestChangePassword,
    RequestLogin,
    RequestLogout,
    RequestRecovery,
    RequestRegister,
    RequestVerifySession,
} from "../api/AuthApi";

const AuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuth: false,
            user: null,
            messageError: "",
            emailRecovery: "",
            isLoading: false,
            typeLoading: null,

            login: (username: string, password: string) => {
                const defaultResponse = { isLoading: false, typeLoading: null };
                set({ isLoading: true, typeLoading: "LOGIN" });

                return RequestLogin({ username, password }).then((res) => {
                    const { data, ok, message } = res;
                    const loginData = data?.loginData;

                    if (ok) {
                        set({
                            isAuth: !!loginData,
                            user: loginData,
                            messageError: "",
                            ...defaultResponse,
                        });
                    } else {
                        set({
                            messageError: message,
                            ...defaultResponse,
                        });
                    }
                });
            },

            register: (username: string, password: string) => {
                const defaultResponse = { isLoading: false, typeLoading: null };
                set({ isLoading: true, typeLoading: "REGISTER" });

                return RequestRegister({ username, password }).then((res) => {
                    const { data, ok, message } = res;
                    const loginData = data?.loginData;

                    if (ok) {
                        set({
                            isAuth: !!loginData,
                            user: loginData,
                            messageError: "",
                            ...defaultResponse,
                        });
                    } else {
                        set({
                            messageError: message,
                            ...defaultResponse,
                        });
                    }
                });
            },

            logout: () => {
                const defaultResponse = { isLoading: false, typeLoading: null };
                set({ isLoading: true, typeLoading: "LOGOUT" });

                return RequestLogout().then((res) => {
                    const { ok, message } = res;

                    if (ok) {
                        set({
                            isAuth: false,
                            user: null,
                            messageError: "",
                            ...defaultResponse,
                        });
                    } else {
                        set({
                            messageError: message,
                            ...defaultResponse,
                        });
                    }
                });
            },

            verifySession: () => {
                set({ isLoading: true, typeLoading: "VERIFY_SESSION" });

                return RequestVerifySession().then((res) => {
                    const isAuth = !!res.ok;

                    set({
                        isAuth,
                        isLoading: false,
                        typeLoading: null,
                    });
                });
            },

            setRecoveryPassword: (email) => {
                set({ isLoading: true, typeLoading: "RECOVERY" });

                return RequestRecovery({ email }).then((res) => {
                    if (!res.ok) {
                        return false;
                    }

                    set({
                        isLoading: false,
                        typeLoading: null,
                        emailRecovery: email,
                    });

                    return true;
                });
            },

            setChangePassword: (email, password, uuid) => {
                const defaultResponse = { isLoading: false, typeLoading: null };
                set({ isLoading: true, typeLoading: "CHANGE_PASSWORD" });

                const props = { email, nuevaPassword: password, token: uuid };

                return RequestChangePassword(props).then((res) => {
                    const { data, ok, message } = res;

                    if (ok) {
                        set({
                            emailRecovery: "",
                            messageError: "",
                            ...defaultResponse,
                        });
                    } else {
                        set({
                            messageError: message,
                            ...defaultResponse,
                        });
                    }

                    if (data?.valido) {
                        return true;
                    }

                    return false;
                });
            },

            setLoading: (loading) => set({ isLoading: loading }),
            updateUserData: (data) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...data } : state.user,
                })),
        }),
        {
            name: "session",
            partialize: (state) => ({ user: state.user, isAuth: state.isAuth }),
        }
    )
);

export default AuthStore;
