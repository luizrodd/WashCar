import api from "@/api/fetchClient";
import { CreateScheduleRequest } from "./requests/createScheduleRequest";
import { AppointmentProps } from "@/pages/Schedule";

export const CreateSchedule = async (schedule: CreateScheduleRequest) => {
  const { data } = await api.post("/schedules", schedule);
  return data;
}

export const GetSchedulesByDate = async (date: Date) => {
  const { data } = await api.get(`/schedules/${date.toISOString()}`);
  return data as AppointmentProps || { 
    schedules: [], 
    totalAppointments: 0, 
    schedulesCancelled: 0, 
    schedulesCompleted: 0, 
    schedulesPending: 0 };  ;
}