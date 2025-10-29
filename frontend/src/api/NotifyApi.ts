import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const NOTIFY_URLS = {
    LIST: "/notificaciones/listar",
};

export const RequestNotifys = () => handleRequest<Notify[]>(HTTP_METHODS.GET, NOTIFY_URLS.LIST);
