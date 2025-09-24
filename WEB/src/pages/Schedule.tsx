import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Filter } from "lucide-react";
import { useGetSchedulesByDate } from "@/hooks/use-schedule";
import { ClientProps } from "./Clients";
import { VehicleProps } from "./ClientDetails";
import { useMemo } from "react";
import { format } from "date-fns";

export interface AppointmentProps {
  totalAppointments: number;
  schedulesCancelled: number;
  schedulesPending: number;
  schedulesCompleted: number;
  schedules: ScheduleProps[]
}

interface ScheduleProps {
  client: ClientProps;
  services: ServiceProps[];
  vehicle: VehicleProps;
  scheduledAt: Date;
  status: "completed" | "pending" | "cancelled";
}

interface ServiceProps {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  createdAt: Date;
  lastUpdatedAt?: Date;
}

const Schedule = () => {
  const today = useMemo(() => new Date(), []);
  const { data, error, isLoading } = useGetSchedulesByDate(today);


  const appointment = data;

  if (isLoading) return <div>Loading schedule...</div>;
  if (error) return <div>Error loading schedule</div>;

  const formatDate = (date: string | Date) => {
    return format(new Date(date), "HH:mm");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Schedule</h1>
          <p className="text-muted-foreground">Manage appointments and bookings</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Appointments - {format(today, "dd/MM/yyyy")}
              </CardTitle>
              <CardDescription>{appointment.totalAppointments} appointments scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointment.schedules.map((schedule) => (
                  <div key={schedule.client.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-medium text-primary">{formatDate(schedule.scheduledAt.toString())}</div>
                      </div>
                      <div className="border-l pl-4">
                        <p className="font-medium">{schedule.client.name}</p>
                        <p className="text-sm text-muted-foreground">{schedule.vehicle.model}</p>
                        <p className="text-sm text-muted-foreground">{schedule.services.map(service => service.name).join(", ")}</p>
                        <p className="text-xs text-muted-foreground">{schedule.client.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${schedule.status === 'completed' ? 'bg-success-light text-success' :
                          'bg-warning-light text-warning'
                        }`}>
                        {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                      </span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Today</span>
                <span className="font-medium">{appointment.totalAppointments} appointments</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="font-medium text-success">{appointment.schedulesCompleted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="font-medium text-warning">{appointment.schedulesPending}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Slots</CardTitle>
              <CardDescription>Remaining open slots today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["11:00 AM", "12:00 PM", "2:30 PM", "4:00 PM", "5:00 PM"].map((slot) => (
                  <div key={slot} className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm">{slot}</span>
                    <Button size="sm" variant="ghost">Book</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;