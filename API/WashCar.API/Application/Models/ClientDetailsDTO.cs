namespace WashCar.API.Application.Models;

public class ClientDetailsDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public List<VehicleDTO> Vehicles { get; set; }
}
