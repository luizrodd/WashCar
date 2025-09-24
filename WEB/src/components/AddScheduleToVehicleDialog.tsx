import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useServices } from "@/hooks/use-services";
import { VehicleProps } from "@/pages/ClientDetails";
import { useAvailableTimes } from "@/hooks/use-avaibletimes";

const appointmentSchema = z.object({
  date: z.date().refine((date) => date !== undefined, {
    message: "Appointment date is required.",
  }),
  time: z.string().min(1, "Time is required"),
  serviceTypes: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ).min(1, "At least one service is required"),
  vehicleId: z.string().min(1, "Vehicle is required"),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AddScheduleToVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AppointmentFormData) => void;
  clientName: string;
  vehicles: VehicleProps[];
}

export function AddScheduleToVehicleDialog({
  open,
  onOpenChange,
  onSubmit,
  clientName,
  vehicles
}: AddScheduleToVehicleDialogProps) {
  const date = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const { data, isLoading, error } = useServices();
  const { data: avaibleTimes, isLoading: isLoadingTimes } = useAvailableTimes(selectedDate);
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: date,
      time: "",
      serviceTypes: [],
      vehicleId: "",
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading services</div>;


  const serviceTypes = data || [];
  const timeSlots = avaibleTimes || [];

  const handleSubmit = (data: AppointmentFormData) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  const onDateChange = (date: Date) => {
    setSelectedDate(date || new Date());
    form.setValue("date", date);
    form.setValue("time", ""); 
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Appointment</DialogTitle>
          <DialogDescription>
            Create a new appointment for {clientName}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Date Field */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Appointment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(selectedDate) => onDateChange(selectedDate)}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Field */}
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Types Field */}
            <FormField
              control={form.control}
              name="serviceTypes"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Service Types</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {serviceTypes.map((service: { id: string; name: string }) => (
                      <FormField
                        key={service.id}
                        control={form.control}
                        name="serviceTypes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={service.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.some((value) => value.id === service.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, service])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value) => value.id !== service.id
                                        )
                                      )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {service.name}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Vehicle Field */}
            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.year} {vehicle.model} {vehicle.color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Schedule Appointment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}