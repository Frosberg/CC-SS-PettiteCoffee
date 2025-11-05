import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const PRODUCTS_URLS = {
    LIST: "/products/getAllProducts",
    DELETE: "/products/eliminar/",
    UPDATE: "/products/modificar/",
    CREATE: "/products/agregar",
};

export const RequestProducts = () => handleRequest<Product[]>(HTTP_METHODS.GET, PRODUCTS_URLS.LIST);

export const RequestDeleteProduct = (id: number) =>
    handleRequest<string>(HTTP_METHODS.DELETE, `${PRODUCTS_URLS.DELETE}${id}`);

export const RequestUpdateProduct = (id: number, data: Partial<Product>) =>
    handleRequest<void>(HTTP_METHODS.PATCH, `${PRODUCTS_URLS.UPDATE}${id}`, data);

export const RequestCreateProduct = (data: Product) =>
    handleRequest<Product>(HTTP_METHODS.POST, PRODUCTS_URLS.CREATE, data);
