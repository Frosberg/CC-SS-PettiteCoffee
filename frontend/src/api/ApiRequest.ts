import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import AuthStore from "../stores/AuthStore";

const BASE_URL = "http://localhost:8080";

const HTTP_METHODS = {
    GET: "get",
    POST: "post",
    PUT: "put",
    PATCH: "patch",
    DELETE: "delete",
} as const;

const ApiRequest = axios.create({
    baseURL: BASE_URL,
});

ApiRequest.interceptors.request.use((config) => {
    const token = AuthStore.getState().user?.token;

    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

const parseApiError = (error: unknown): ApiResponse<never> => {
    if (axios.isAxiosError(error)) {
        const axiosErr = error as AxiosError<any>;
        const status = axiosErr.response?.status;
        const data = axiosErr.response?.data;

        return {
            ok: false,
            status,
            message:
                data?.message ||
                (typeof data === "string" ? data : undefined) ||
                axiosErr.message ||
                "Ocurrió un error desconocido.",
            details: data,
        };
    }

    return {
        ok: false,
        message: error instanceof Error ? error.message : "Error desconocido",
    };
};

async function handleRequest<T = unknown>(
    method: HttpMethod,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        const response = await ApiRequest.request<T>({
            method,
            url,
            data,
            ...config,
        });

        return {
            ok: true,
            data: response.data,
            status: response.status,
        };
    } catch (error) {
        return parseApiError(error);
    }
}

export { handleRequest, HTTP_METHODS };
