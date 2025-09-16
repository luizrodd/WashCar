import { createClient, getClients } from "@/services/clientService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useClients = () =>
    useQuery({
        queryKey: ["clients"],
        queryFn: getClients,
    });

export const useCreateClient = () => {
    return useMutation({
        mutationFn: createClient,
    })
}
