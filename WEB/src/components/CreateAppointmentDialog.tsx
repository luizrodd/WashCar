import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Car, Clock, PlusCircle, UserPlus } from "lucide-react";
import { format, set } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useServices } from "@/hooks/use-services";
import { useAvailableTimes } from "@/hooks/use-avaibletimes";
import { useClients, useClientById, useCreateClient } from "@/hooks/use-client";
import { useCreateSchedule } from "@/hooks/use-schedule";
import { CreateClientRequest } from "@/services/requests/createClientRequest";
import { CreateScheduleRequest } from "@/services/requests/createScheduleRequest";
import { getClientById } from "@/services/clientService";
import { VehicleProps } from "@/pages/ClientDetails";
import { useQueryClient } from "@tanstack/react-query";

const existingAppointmentSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  vehicleId: z.string().min(1, "Vehicle is required"),
  date: z.date({
    error: "Date is required",
  }),
  time: z.string().min(1, "Time is required"),
  services: z.array(z.string()).min(1, "Select at least one service"),
});

const newClientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  vehicle: z.object({
    model: z.string().min(2, "Vehicle model is required"),
    color: z.string().min(1, "Vehicle color is required"),
    year: z.string().min(4, "Vehicle year is required"),
    plate: z.string().min(3, "License plate is required"),
  }),
  date: z.date({
    error: "Date is required",
  }),
  time: z.string().min(1, "Time is required"),
  services: z.array(z.string()).min(1, "Select at least one service"),
});

type ExistingAppointmentFormValues = z.infer<typeof existingAppointmentSchema>;
type NewClientFormValues = z.infer<typeof newClientSchema>;

type ClientSummary = {
  id: number | string;
  name: string;
  phoneNumber: string;
  email: string;
};

type ClientDetails = ClientSummary & {
  vehicles: VehicleProps[];
};

interface CreateAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const getInitialExistingValues = (): ExistingAppointmentFormValues => ({
  clientId: "",
  vehicleId: "",
  date: new Date(),
  time: "",
  services: [],
});

const getInitialNewClientValues = (): NewClientFormValues => ({
  name: "",
  phoneNumber: "",
  email: "",
  vehicle: {
    model: "",
    color: "",
    year: new Date().getFullYear().toString(),
    plate: "",
  },
  date: new Date(),
  time: "",
  services: [],
});

const buildScheduledAt = (date: Date, time: string) => {
  console.log(time)
  const [hours, minutes] = time.split(":").map((value) => parseInt(value, 10));
  console.log(hours, minutes)
  const dateTime = set(date, { hours, minutes, seconds: 0 });
  console.log(dateTime)
  return format(dateTime, "yyyy-MM-dd'T'HH:mm:ss");
};

export function CreateAppointmentDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateAppointmentDialogProps) {
  const [tab, setTab] = useState<"existing" | "new">("existing");
  const queryClient = useQueryClient();

  const existingForm = useForm<ExistingAppointmentFormValues>({
    resolver: zodResolver(existingAppointmentSchema),
    defaultValues: useMemo(() => getInitialExistingValues(), []),
  });

  const newClientForm = useForm<NewClientFormValues>({
    resolver: zodResolver(newClientSchema),
    defaultValues: useMemo(() => getInitialNewClientValues(), []),
    mode: "onTouched",
  });

  const [existingDate, setExistingDate] = useState<Date>(new Date());
  const [newClientDate, setNewClientDate] = useState<Date>(new Date());

  const { data: servicesData, isLoading: isLoadingServices } = useServices();
  const { data: availableTimesExisting } = useAvailableTimes(existingDate);
  const { data: availableTimesNew } = useAvailableTimes(newClientDate);
  const { data: clientsData, isLoading: isLoadingClients } = useClients();

  const selectedClientId = existingForm.watch("clientId");
  const { data: clientDetailsData, isFetching: isFetchingClientDetails } =
    useClientById(selectedClientId ?? "");

  const createSchedule = useCreateSchedule();
  const createClient = useCreateClient();

  useEffect(() => {
    if (!open) {
      existingForm.reset(getInitialExistingValues());
      newClientForm.reset(getInitialNewClientValues());
      setExistingDate(new Date());
      setNewClientDate(new Date());
      setTab("existing");
    }
  }, [open, existingForm, newClientForm]);

  useEffect(() => {
    const subscription = existingForm.watch((value, { name }) => {
      if (name === "date" && value.date) {
        setExistingDate(value.date);
      }
    });
    return () => subscription.unsubscribe();
  }, [existingForm]);

  useEffect(() => {
    const subscription = newClientForm.watch((value, { name }) => {
      if (name === "date" && value.date) {
        setNewClientDate(value.date);
      }
    });
    return () => subscription.unsubscribe();
  }, [newClientForm]);

  const servicesOptions = servicesData || [];
  const timeSlotsExisting = availableTimesExisting || [];
  const timeSlotsNew = availableTimesNew || [];
  const clients = (clientsData as ClientSummary[]) || [];
  const clientDetails = (clientDetailsData as ClientDetails) || undefined;
  const vehicles = clientDetails?.vehicles ?? [];

  const handleExistingSubmit = async (values: ExistingAppointmentFormValues) => {
    const payload: CreateScheduleRequest = {
      vehicleId: values.vehicleId,
      scheduledAt: buildScheduledAt(values.date, values.time),
      servicesId: values.services,
    };

    try {
      await createSchedule.mutateAsync(payload);
      toast.success("Appointment created successfully!");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to create appointment. Please try again.");
      console.error(error);
    }
  };

  const handleNewClientSubmit = async (values: NewClientFormValues) => {
    const clientPayload: CreateClientRequest = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      vehicle: {
        model: values.vehicle.model,
        color: values.vehicle.color,
        plate: values.vehicle.plate,
        year: values.vehicle.year,
        scheduledDate: values.date,
      },
    };

    try {
      const clientResponse = await createClient.mutateAsync(clientPayload);

      let newClientId: string | number | undefined;
      let createdVehicles: VehicleProps[] = [];

      if (typeof clientResponse === "object" && clientResponse !== null) {
        const responseAsClient = clientResponse as Partial<ClientDetails> & {
          vehicles?: VehicleProps[];
          clientId?: string | number;
        };
        newClientId = responseAsClient.id ?? responseAsClient.clientId;
        createdVehicles = responseAsClient.vehicles ?? [];
      } else {
        newClientId = clientResponse as string | number | undefined;
      }

      if (!newClientId) {
        throw new Error("Client creation did not return an id");
      }

      if (!createdVehicles.length) {
        const createdClient = (await getClientById(
          String(newClientId)
        )) as ClientDetails;
        createdVehicles = createdClient?.vehicles ?? [];
      }
      const firstVehicleId = createdVehicles[0]?.id;

      if (!firstVehicleId) {
        throw new Error("Unable to determine vehicle id for the new client");
      }

      const schedulePayload: CreateScheduleRequest = {
        vehicleId: firstVehicleId,
        scheduledAt: buildScheduledAt(values.date, values.time),
        servicesId: values.services,
      };

      await createSchedule.mutateAsync(schedulePayload);

      toast.success("Client and appointment created successfully!");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({
        queryKey: ["client", String(newClientId)],
      });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast.error("Could not create client or appointment. Please try again.");
      console.error(error);
    }
  };

  const isSubmitting =
    createSchedule.isPending || createClient.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1020px]">
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
          <DialogDescription>
            Schedule a service for an existing client or onboard a new one.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="existing">Existing client</TabsTrigger>
            <TabsTrigger value="new">New client</TabsTrigger>
          </TabsList>

          <TabsContent value="existing">
            <Form {...existingForm}>
              <form
                onSubmit={existingForm.handleSubmit(handleExistingSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={existingForm.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            existingForm.setValue("vehicleId", "");
                          }}
                          disabled={isLoadingClients}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                isLoadingClients ? "Loading clients..." : "Select client"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {clients.map((client) => (
                              <SelectItem key={client.id} value={client.id.toString()}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{client.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {client.phoneNumber}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={existingForm.control}
                  name="vehicleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={!selectedClientId || isFetchingClientDetails}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                selectedClientId
                                  ? isFetchingClientDetails
                                    ? "Loading vehicles..."
                                    : vehicles.length
                                    ? "Select vehicle"
                                    : "No vehicles found"
                                  : "Select a client first"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {vehicles.map((vehicle) => (
                              <SelectItem key={vehicle.id} value={vehicle.id}>
                                {vehicle.year} {vehicle.model} · {vehicle.plate}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={existingForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Appointment date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : "Pick a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(date);
                                existingForm.setValue("time", "");
                              }
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={existingForm.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={!timeSlotsExisting.length}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                timeSlotsExisting.length
                                  ? "Select time"
                                  : "No slots available"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlotsExisting.map((time) => (
                              <SelectItem key={time} value={time}>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{time}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={existingForm.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <FormLabel>Services</FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-md border p-3">
                        {servicesOptions.map(
                          (service: { id: string; name: string }) => (
                            <FormField
                              key={service.id}
                              control={existingForm.control}
                              name="services"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(service.id)}
                                      onCheckedChange={(checked) => {
                                        const current = field.value || [];
                                        field.onChange(
                                          checked
                                            ? [...current, service.id]
                                            : current.filter((id) => id !== service.id)
                                        );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {service.name}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          )
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || isLoadingServices}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create appointment
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="new">
            <Form {...newClientForm}>
              <form
                onSubmit={newClientForm.handleSubmit(handleNewClientSubmit)}
                className="space-y-4"
              >
                <div className="flex">
                  <div className="rounded-lg border p-4 space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Client information
                    </h3>
                    <FormField
                      control={newClientForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Client name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <FormField
                        control={newClientForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="(11) 99999-9999" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={newClientForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="client@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Vehicle information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <FormField
                        control={newClientForm.control}
                        name="vehicle.model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                              <Input placeholder="Model" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={newClientForm.control}
                        name="vehicle.color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                              <Input placeholder="Color" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <FormField
                        control={newClientForm.control}
                        name="vehicle.year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                              <Input placeholder="2022" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={newClientForm.control}
                        name="vehicle.plate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plate</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="ABC1D23"
                                {...field}
                                onChange={(event) =>
                                  field.onChange(event.target.value.toUpperCase())
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Appointment details
                    </h3>

                    <FormField
                      control={newClientForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, "PPP") : "Pick a date"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(date);
                                    newClientForm.setValue("time", "");
                                  }
                                }}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={newClientForm.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              disabled={!timeSlotsNew.length}
                            >
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    timeSlotsNew.length
                                      ? "Select time"
                                      : "No slots available"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlotsNew.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4" />
                                      <span>{time}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={newClientForm.control}
                      name="services"
                      render={() => (
                        <FormItem>
                          <FormLabel>Services</FormLabel>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-md border p-3">
                            {servicesOptions.map(
                              (service: { id: string; name: string }) => (
                                <FormField
                                  key={service.id}
                                  control={newClientForm.control}
                                  name="services"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(service.id)}
                                          onCheckedChange={(checked) => {
                                            const current = field.value || [];
                                            field.onChange(
                                              checked
                                                ? [...current, service.id]
                                                : current.filter((id) => id !== service.id)
                                            );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {service.name}
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              )
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || isLoadingServices}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create client & appointment
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
