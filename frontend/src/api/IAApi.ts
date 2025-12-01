import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const IA_URLS = {
    CONSULTA: "/IA/consulta",
    SOPORTE: "",
};

export type AgentIAMode = "recommendations" | "Support";

export const RequestIAConsulta = (prompt: string, mode: AgentIAMode = "recommendations") => {
    const endpoint = mode === "Support" ? IA_URLS.SOPORTE : IA_URLS.CONSULTA;

    return handleRequest<any>(HTTP_METHODS.POST, endpoint, { prompt, mode });
};
