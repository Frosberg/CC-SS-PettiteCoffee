import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const BASE_URL = "http://localhost:8080";

export const ApiRequest = axios.create({
    baseURL: BASE_URL,
});

ApiRequest.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
