import api from "@/api/fetchClient";
import { CreateScheduleRequest } from "./requests/createScheduleRequest";
import { AppointmentProps } from "@/pages/Schedule";
import { CalendarProps } from "@/pages/Calendar";

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

export const GetScheduleByRangeDate = async (startDate: Date, endDate: Date) => {
  const { data } = await api.get(`/schedules/${startDate.toISOString()}/to/${endDate.toISOString()}`);
  return data as CalendarProps[] || [];
}

export const CompleteSchedule = async (id: string) => {
  const { data } = await api.post(`/schedules/complete/${id}`)
  return data;
}
