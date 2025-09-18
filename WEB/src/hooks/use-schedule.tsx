import { CreateSchedule, GetSchedulesByDate } from "@/services/scheduleService"
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