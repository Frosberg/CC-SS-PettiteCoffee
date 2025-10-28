import { create } from "zustand";
import { ApiRequest } from "../services/ApiRequest";
import { AxiosError } from "axios";

const useBranchStore = create<BranchStore>((set, get) => ({
    branchs: [],
    getBranchs: async () => {
        try {
            const { data } = await ApiRequest.get("/sucursales/listar");
            set({ branchs: data });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    },
    createBranch: async ({ direccion, nombre }) => {
        try {
            const branch = { direccion, nombre };
            const { data } = await ApiRequest.post("/sucursales/agregar", branch);
            set({ branchs: [...get().branchs, data] });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    },
}));

export default useBranchStore;
