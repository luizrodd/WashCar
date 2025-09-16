import { CreateSchedule } from "@/services/scheduleService"
import { useMutation } from "@tanstack/react-query"

export const useCreateSchedule = () => {
    return useMutation({
        mutationFn: CreateSchedule,
    })
}
