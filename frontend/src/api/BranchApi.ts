import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const BRANCHS_URLS = {
    LIST: "/sucursales/listar",
    CREATE: "/sucursales/agregar",
    DELETE: "/sucursales/eliminar/",
    UPDATE: "/sucursales/modificar/",
};

export const RequestBranches = () => handleRequest<Branch[]>(HTTP_METHODS.GET, BRANCHS_URLS.LIST);

export const RequestCreateBranch = (branch: Branch) =>
    handleRequest<Branch>(HTTP_METHODS.POST, BRANCHS_URLS.CREATE, branch);

export const RequestUpdateBranch = (id: number, branch: Branch) =>
    handleRequest<Branch>(HTTP_METHODS.PATCH, `${BRANCHS_URLS.UPDATE}${id}`, branch);

export const RequestDeleteBranch = (id: number) =>
    handleRequest<void>(HTTP_METHODS.DELETE, `${BRANCHS_URLS.DELETE}${id}`);
