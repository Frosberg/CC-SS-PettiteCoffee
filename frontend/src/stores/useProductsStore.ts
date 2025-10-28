import { create } from "zustand";
import { ApiRequest } from "../services/ApiRequest";
import { AxiosError } from "axios";

const useProductsStore = create<ProductStore>((set) => ({
    products: [],
    getProducts: async () => {
        try {
            const { data } = await ApiRequest.get("/products/getAllProducts");
            set({ products: data });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    },
}));

export default useProductsStore;
