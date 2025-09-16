import api from "@/api/fetchClient";
import { CreateClientRequest } from "./requests/createClientRequest";


export const getClients = async () => {
  const { data } = await api.get("/clients");
  return data;
};

export const createClient = async (client: CreateClientRequest) => {
  const { data } = await api.post("/clients", client);
  return data;
};