import { createClient, getClientById, getClients } from "@/services/clientService";
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

export const useClientById = (id: string) =>
    useQuery({
        queryKey: ["client", id],
        queryFn: () => getClientById(id),
        enabled: !!id, // Only run the query if id is truthy
    });
