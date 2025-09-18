import api from "@/api/fetchClient";
import { CreateScheduleRequest } from "./requests/createScheduleRequest";

export const CreateSchedule = async (schedule: CreateScheduleRequest) => {
  const { data } = await api.post("/schedules", schedule);
  return data;
}

export const GetSchedulesByDate = async (date: Date) => {
  const { data } = await api.get(`/schedules/${date.toISOString()}`);
  return data;
}