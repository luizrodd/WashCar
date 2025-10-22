import { CreateSchedule, GetScheduleByRangeDate, GetSchedulesByDate } from "@/services/scheduleService"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateSchedule = () => {
    return useMutation({
        mutationFn: CreateSchedule,
    })
}

export const useGetSchedulesByDate = (date: Date) => {
    return useQuery({
        queryKey: ["schedules", date],
        queryFn: () => GetSchedulesByDate(date),
        enabled: !!date, // Only run the query if date is truthy
    })

}

export const useGetScheduleByRangeDate = (startDate: Date, endDate: Date) => {
    return useQuery({
        queryKey: ["schedules", startDate, endDate],
        queryFn: () => GetScheduleByRangeDate(startDate, endDate),
        enabled: !!startDate && !!endDate, // Only run the query if both dates are truthy
    })
}