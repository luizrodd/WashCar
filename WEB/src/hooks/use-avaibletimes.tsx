import { GetAvaibleTimesToSchedule } from "@/services/avaibleTimesService"
import { useQuery } from "@tanstack/react-query"

export const useAvailableTimes = (date: Date) => {
  return useQuery({
    queryKey: ["availableTimes", date],
    queryFn: () => GetAvaibleTimesToSchedule(date),
    enabled: !!date, 
  })
}