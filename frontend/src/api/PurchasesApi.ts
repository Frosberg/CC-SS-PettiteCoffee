import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const PURCHASES_URLS = {
    LIST: "/purchases/getPurchases",
    CREATE: "/purchases/newPurchase",
};

export const RequestPurchases = () =>
    handleRequest<Purchase[]>(HTTP_METHODS.GET, PURCHASES_URLS.LIST);

export const RequestNewPurchase = (data: NewPurchasePayload) =>
    handleRequest<void>(HTTP_METHODS.POST, PURCHASES_URLS.CREATE, data);
