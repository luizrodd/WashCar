export interface CreateScheduleRequest {
    vehicleId: string;
    scheduledAt: string;
    servicesId: string[];
}