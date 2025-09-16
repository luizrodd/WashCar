namespace WashCar.API.Controllers.Request;

public record CreateClientRequest(string Name, string Email, string PhoneNumber, CreateVehicleRequest Vehicle);
