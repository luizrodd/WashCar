namespace WashCar.API.Controllers.Request;

public record CreateScheduleRequest(Guid VehicleId, DateTime ScheduledAt, Guid[] ServicesId);
