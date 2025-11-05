import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const AUTH_URLS = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    VERIFY_SESSION: "/auth/protectedTest",
    RECOVERY: "/auth/recuperar",
    CHANGE_PASSWORD: "/auth/cambiar-password",
};

export const RequestLogin = (props: CredentialProps) =>
    handleRequest<UserDataResponse>(HTTP_METHODS.POST, AUTH_URLS.LOGIN, props);

export const RequestRegister = (props: CredentialProps) =>
    handleRequest<UserDataResponse>(HTTP_METHODS.POST, AUTH_URLS.REGISTER, props);

export const RequestLogout = () => handleRequest<void>(HTTP_METHODS.POST, AUTH_URLS.LOGOUT);

export const RequestVerifySession = () =>
    handleRequest<string>(HTTP_METHODS.GET, AUTH_URLS.VERIFY_SESSION);

export const RequestRecovery = (props: RecoveryProps) =>
    handleRequest<void>(HTTP_METHODS.POST, AUTH_URLS.RECOVERY, props);

export const RequestChangePassword = (props: ChangePasswordProps) =>
    handleRequest<ChangePasswordResponse>(HTTP_METHODS.POST, AUTH_URLS.CHANGE_PASSWORD, props);
