import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Car, Users, DollarSign, Clock, Droplets } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Today's Appointments",
      value: "12",
      description: "3 pending confirmation",
      icon: Calendar,
      trend: "+2 from yesterday"
    },
    {
      title: "Active Clients",
      value: "248",
      description: "15 new this month", 
      icon: Users,
      trend: "+12% from last month"
    },
    {
      title: "Vehicles Registered",
      value: "342",
      description: "Mixed fleet sizes",
      icon: Car,
      trend: "+8% growth"
    },
    {
      title: "Today's Revenue",
      value: "$1,249",
      description: "Target: $1,500",
      icon: DollarSign,
      trend: "83% of daily goal"
    }
  ];

  const recentAppointments = [
    { id: 1, client: "John Smith", vehicle: "Honda Civic 2020", service: "Full Wash & Wax", time: "9:00 AM", status: "completed" },
    { id: 2, client: "Sarah Johnson", vehicle: "Toyota RAV4 2019", service: "Express Wash", time: "10:30 AM", status: "in-progress" },
    { id: 3, client: "Mike Davis", vehicle: "BMW X3 2021", service: "Detail Package", time: "11:00 AM", status: "pending" },
    { id: 4, client: "Lisa Wilson", vehicle: "Ford Explorer 2018", service: "Interior Clean", time: "2:00 PM", status: "scheduled" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your car wash overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground mb-1">{stat.description}</p>
              <p className="text-xs text-success">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Upcoming and completed appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium">{appointment.client}</p>
                    <p className="text-sm text-muted-foreground">{appointment.vehicle}</p>
                    <p className="text-sm text-muted-foreground">{appointment.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.time}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'completed' ? 'bg-success-light text-success' :
                      appointment.status === 'in-progress' ? 'bg-warning-light text-warning' :
                      appointment.status === 'pending' ? 'bg-primary-light text-primary' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">New Appointment</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Add Client</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-center">
                <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Register Vehicle</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Process Payment</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;