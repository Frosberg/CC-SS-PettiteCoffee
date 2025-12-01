import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const IA_URLS = {
    RESPONSE: "/IA/consulta",
};

export type AgentIAMode = "recommendations" | "Support";

export const RequestIAConsulta = (prompt: string, mode: AgentIAMode = "recommendations") => {
    return handleRequest<any>(HTTP_METHODS.POST, IA_URLS.RESPONSE, { prompt, mode });
};
