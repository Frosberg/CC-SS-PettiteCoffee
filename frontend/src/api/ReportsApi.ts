import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const REPORTS_URLS = {
    BRANCHS: "/sucursales/getReport",
    ACCOUNTS: "/accounts/getReport",
    PRODUCTS: "/products/getReport",
};

export const RequestReportBranch = () =>
    handleRequest<Blob>(HTTP_METHODS.GET, REPORTS_URLS.BRANCHS, null, {
        responseType: "blob",
    });

export const RequestReportAccount = () =>
    handleRequest<Blob>(HTTP_METHODS.GET, REPORTS_URLS.ACCOUNTS, null, {
        responseType: "blob",
    });

export const RequestReportProduct = () =>
    handleRequest<Blob>(HTTP_METHODS.GET, REPORTS_URLS.PRODUCTS, null, {
        responseType: "blob",
    });
