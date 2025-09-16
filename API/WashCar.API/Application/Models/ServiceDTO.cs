using WashCar.Domain.Data.Service;

namespace WashCar.API.Application.Models;

public class ServiceDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public ServiceTypeEnum Type { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastUpdatedAt { get; set; }
}
