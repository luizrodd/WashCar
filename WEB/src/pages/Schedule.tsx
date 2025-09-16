import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Filter } from "lucide-react";

const Schedule = () => {
  const appointments = [
    { 
      id: 1, 
      time: "8:00 AM", 
      client: "John Smith", 
      vehicle: "Honda Civic 2020", 
      service: "Full Wash & Wax", 
      duration: "45 min", 
      status: "confirmed",
      phone: "(555) 123-4567"
    },
    { 
      id: 2, 
      time: "9:00 AM", 
      client: "Sarah Johnson", 
      vehicle: "Toyota RAV4 2019", 
      service: "Express Wash", 
      duration: "20 min", 
      status: "pending",
      phone: "(555) 234-5678"
    },
    { 
      id: 3, 
      time: "10:30 AM", 
      client: "Mike Davis", 
      vehicle: "BMW X3 2021", 
      service: "Detail Package", 
      duration: "90 min", 
      status: "confirmed",
      phone: "(555) 345-6789"
    },
    { 
      id: 4, 
      time: "1:00 PM", 
      client: "Lisa Wilson", 
      vehicle: "Ford Explorer 2018", 
      service: "Interior Clean", 
      duration: "60 min", 
      status: "confirmed",
      phone: "(555) 456-7890"
    },
    { 
      id: 5, 
      time: "3:00 PM", 
      client: "Robert Brown", 
      vehicle: "Audi Q5 2022", 
      service: "Full Detail", 
      duration: "120 min", 
      status: "pending",
      phone: "(555) 567-8901"
    }
  ];

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
                Today's Appointments - March 15, 2024
              </CardTitle>
              <CardDescription>5 appointments scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-medium text-primary">{appointment.time}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {appointment.duration}
                        </div>
                      </div>
                      <div className="border-l pl-4">
                        <p className="font-medium">{appointment.client}</p>
                        <p className="text-sm text-muted-foreground">{appointment.vehicle}</p>
                        <p className="text-sm text-muted-foreground">{appointment.service}</p>
                        <p className="text-xs text-muted-foreground">{appointment.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'confirmed' ? 'bg-success-light text-success' :
                        'bg-warning-light text-warning'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
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
                <span className="font-medium">5 appointments</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Confirmed</span>
                <span className="font-medium text-success">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="font-medium text-warning">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Duration</span>
                <span className="font-medium">5h 35min</span>
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