import api from "@/api/fetchClient";

export const GetAvaibleTimesToSchedule = async (date: Date) => {
  const { data } = await api.get(`avaibletimes/${date.toISOString()}`);
  return data;
}