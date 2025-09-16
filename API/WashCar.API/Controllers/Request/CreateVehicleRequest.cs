namespace WashCar.API.Controllers.Request;

public record CreateVehicleRequest(string Model, string Color, string Plate, string Year, DateTime ScheduledDate);
