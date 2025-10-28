import { create } from "zustand";
import { ApiRequest } from "../services/ApiRequest";
import { AxiosError } from "axios";

const useNotifyStore = create<NotifyStore>((set) => ({
    notifys: [],
    getNotifys: async () => {
        try {
            const { data } = await ApiRequest.get("/notificaciones/listar");
            set({ notifys: data });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    },
}));

export default useNotifyStore;
