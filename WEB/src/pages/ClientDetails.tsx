import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Car, Calendar, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { AddScheduleToVehicleDialog } from "@/components/AddScheduleToVehicleDialog";
import { getClientById } from "@/services/clientService";
import { useClientById } from "@/hooks/use-client";
import { useCreateSchedule } from "@/hooks/use-schedule";
import { CreateScheduleRequest } from "@/services/requests/createScheduleRequest";
import { format, set } from "date-fns";

export interface VehicleProps {
    id: string;
    model: string;
    color: string;
    plate: string;
    year: string;
    createdAt: string;
    lastVisitedAt: string;
    totalVisits: number;
}

interface AppointmentProps {
    id: string;
    date: string;
    time: string;
    serviceType: string;
    status: string;
    notes?: string;
    createdAt: string;
    vehicleId: string;
    clientId: string;
}

interface ClientProps {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    lastVisitedAt: string;
    vehicles: VehicleProps[];
    appointments: AppointmentProps[];
}


export default function ClientDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, isLoading } = useClientById(id)
    const createSchedule = useCreateSchedule();
    const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);

    const client: ClientProps = data;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading client data</div>;
    }

    const handleAddAppointment = (appointmentData: any) => {
        var request: CreateScheduleRequest = {
            scheduledAt: formatDate(appointmentData.date, appointmentData.time),
            servicesId: appointmentData.serviceTypes.map((service: any) => service.id),
            vehicleId: appointmentData.vehicleId,
        }

        createSchedule.mutate(request, {
            onSuccess: () => {
                toast.success("Appointment scheduled successfully!");
                setIsAddAppointmentOpen(false);
            },
            onError: () => {
                toast.error("Failed to schedule appointment. Please try again.");
            }
        });
    };

    const formatDate = (date: Date, time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        const dateTime = set(date, { hours, minutes });
        const result = format(dateTime, "yyyy-MM-dd'T'HH:mm:ss");
        return result;
    }

    if (!client) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate("/clients")}>
                        <ArrowLeft className="h-4 w-4" />
                        Back to Clients
                    </Button>
                </div>
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-foreground">Client not found</h1>
                    <p className="text-muted-foreground mt-2">The requested client could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => navigate("/clients")}>
                    <ArrowLeft className="h-4 w-4" />
                    Back to Clients
                </Button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">{client.name}</h1>
                    <p className="text-muted-foreground mt-1">Client Details</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={() => setIsAddAppointmentOpen(true)} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Appointment
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Contact Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">{client.phoneNumber}</p>
                                <p className="text-sm text-muted-foreground">Phone</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">{client.email}</p>
                                <p className="text-sm text-muted-foreground">Email</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Appointment Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Appointments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">{new Date(client.lastVisitedAt).toLocaleDateString()}</p>
                                <p className="text-sm text-muted-foreground">Last Visit</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">{new Date().toLocaleDateString()}</p>
                                <p className="text-sm text-muted-foreground">Next Scheduled</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Vehicles */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        Vehicles ({client.vehicles.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {client.vehicles.map((vehicle, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {vehicle.year} {vehicle.model} {vehicle.color}
                                        </h3>
                                        <p className="text-muted-foreground">License Plate: {vehicle.plate}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Appointments */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Appointments ({0})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {client.appointments?.length ? (
                        <div className="space-y-4">
                            {client.appointments.map((appointment) => (
                                <div key={appointment.id} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">
                                                    {new Date(appointment.date).toLocaleDateString()}
                                                </span>
                                                <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                                                <span>{appointment.time}</span>
                                            </div>
                                            <p className="text-sm font-medium">{appointment.serviceType}</p>
                                            {appointment.notes && (
                                                <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                                            )}
                                        </div>
                                        <Badge variant={appointment.status === "scheduled" ? "default" : "secondary"}>
                                            {appointment.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No appointments scheduled</p>
                    )}
                </CardContent>
            </Card>

            <AddScheduleToVehicleDialog
                open={isAddAppointmentOpen}
                onOpenChange={setIsAddAppointmentOpen}
                onSubmit={handleAddAppointment}
                clientName={client.name}
                vehicles={client.vehicles}
            />
        </div>
    );
}