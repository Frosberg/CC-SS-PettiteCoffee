import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const ACCOUNT_URLS = {
    LIST: "/accounts/listar",
    EXPORT: "/accounts/export",
    UPDATE_PROFILE: "/accounts/update-profile",
};

export const RequestAccounts = () => handleRequest<User[]>(HTTP_METHODS.GET, ACCOUNT_URLS.LIST);

export const RequestExportAccounts = async () => {
    const res = await handleRequest<Blob>(HTTP_METHODS.GET, ACCOUNT_URLS.EXPORT, null, {
        responseType: "blob",
    });

    if (!res.ok || !res.data) return alert("Error al exportar cuentas");

    const url = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "accounts.xlsx";
    a.click();
    URL.revokeObjectURL(url);
};

export const RequestUpdateProfile = (payload: UpdateProfilePayload) =>
    handleRequest<void>(HTTP_METHODS.PUT, ACCOUNT_URLS.UPDATE_PROFILE, payload);
