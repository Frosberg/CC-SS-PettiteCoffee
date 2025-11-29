import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const IA_URLS = {
    CONSULTA: "/IA/consulta",
    SOPORTE: "",
};

export type AgentIAMode = "recommendations" | "support";

export const RequestIAConsulta = (prompt: string, mode: AgentIAMode = "recommendations") => {
    const endpoint = mode === "support" ? IA_URLS.SOPORTE : IA_URLS.CONSULTA;

    if (!endpoint) {
        return Promise.resolve({
            ok: false,
            message: "El endpoint de soporte aún no se encuentra disponible.",
        } satisfies ApiResponse<never>);
    }

    return handleRequest<any>(HTTP_METHODS.POST, endpoint, { prompt, mode });
};
