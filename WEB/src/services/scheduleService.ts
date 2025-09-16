import api from "@/api/fetchClient";
import { CreateScheduleRequest } from "./requests/createScheduleRequest";

export const CreateSchedule = async (schedule: CreateScheduleRequest) => {
  const { data } = await api.post("/schedules", schedule);
  return data;
}