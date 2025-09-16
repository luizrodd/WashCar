import { getServices } from "@/services/scheduleService_Service";
import { useQuery } from "@tanstack/react-query";

export const useServices = () => {
    return useQuery({
        queryKey: ["services"],
        queryFn: getServices,
    });
}