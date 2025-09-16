import api from "@/api/fetchClient";

export const getServices = async () => {
    const { data } = await api.get("/services");
    return data;
}