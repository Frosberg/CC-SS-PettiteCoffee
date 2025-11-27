import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const IA_URLS = {
    CONSULTA: "/IA/consulta",
};

export const RequestIAConsulta = (prompt: string) =>
    handleRequest<any>(HTTP_METHODS.POST, IA_URLS.CONSULTA, { prompt });
