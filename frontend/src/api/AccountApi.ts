import { handleRequest, HTTP_METHODS } from "./ApiRequest";
import ToastStore from "../stores/ToastStore";

const ACCOUNT_URLS = {
    LIST: "/accounts/listar",
    EXPORT: "/accounts/export",
    UPDATE_PROFILE: "/accounts/update-profile",
    CHANGE_ROLE: "/accounts/changeRole",
};

export const RequestAccounts = () => handleRequest<User[]>(HTTP_METHODS.GET, ACCOUNT_URLS.LIST);

export const RequestChangeRole = (payload: { idcuenta: number; rol: string }) =>
    handleRequest<void>(HTTP_METHODS.PATCH, ACCOUNT_URLS.CHANGE_ROLE, payload);

export const RequestExportAccounts = async () => {
    const res = await handleRequest<Blob>(HTTP_METHODS.GET, ACCOUNT_URLS.EXPORT, null, {
        responseType: "blob",
    });

    if (!res.ok || !res.data) {
        ToastStore.getState().showToast({
            title: "Error",
            message: "Error al exportar cuentas",
            type: "error",
        });
        return;
    }

    const url = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "accounts.xlsx";
    a.click();
    URL.revokeObjectURL(url);

    ToastStore.getState().showToast({
        title: "Descarga lista",
        message: "Se exportó el listado de cuentas.",
        type: "success",
    });
};

export const RequestUpdateProfile = (payload: UpdateProfilePayload) =>
    handleRequest<void>(HTTP_METHODS.PATCH, ACCOUNT_URLS.UPDATE_PROFILE, payload);
