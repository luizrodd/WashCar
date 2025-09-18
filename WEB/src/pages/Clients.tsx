import { useEffect, useState } from "react";
import { Plus, Search, Phone, Mail, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddClientDialog } from "@/components/AddClientDialog";
import { toast } from "sonner";
import { useClients, useCreateClient } from "@/hooks/use-client";
import { CreateClientRequest } from "@/services/requests/createClientRequest";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRoutes } from "react-router-dom";

export interface ClientProps {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  scheduledDate: Date;
}


export default function Clients() {
  const { data: clientsData, isLoading, isError } = useClients();
  const queryClient = useQueryClient();
  const createClient = useCreateClient();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredClients = clientsData?.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phoneNumber.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = (formData: any) => {
    let clientRequest: CreateClientRequest = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      vehicle: {
        model: formData.vehicle.model,
        color: formData.vehicle.color,
        plate: formData.vehicle.plate,
        year: formData.vehicle.year.toString(),
        scheduledDate: formData.vehicle.scheduledDate,
      }
    }

    createClient.mutate(clientRequest, {
      onSuccess: (data) => {
        const newClient: ClientProps = {
          id: data,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          scheduledDate: formData.vehicle.scheduledDate
        }

        queryClient.setQueryData<ClientProps[]>(["clients"], (oldData) => {
          return oldData ? [...oldData, newClient] : [newClient];
        });

        setIsAddDialogOpen(false);
      }
    });


    toast.success("Client created successfully!");
  };

  const handleClientClick = (client: ClientProps) => {
    console.log("Client clicked:", client);

    navigate(`/clients/${client.id}`);
  };

  if (isLoading) {
    return <div className="p-6">Carregando clientes…</div>;
  }
  if (isError) {
    return <div className="p-6">Erro ao carregar clientes.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your customers and their vehicles
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add New Client
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleClientClick(client)}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{client.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {client.phoneNumber}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {client.email}
                </div>
              </div>

              <div className="pt-2 border-t space-y-1">
                <div className="text-sm text-muted-foreground">
                  Last visit: {new Date(client.scheduledDate).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {searchTerm ? "No clients found matching your search." : "No clients yet."}
          </div>
        </div>
      )}

      <AddClientDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddClient}
      />
    </div>
  );
}