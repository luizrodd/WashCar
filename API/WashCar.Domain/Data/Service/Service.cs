using School.Domain.Core;

namespace WashCar.Domain.Data.Service;

public class Service : Entity<Guid>, IAggregateRoot
{
    public Service(string name, string description, decimal price, ServiceTypeEnum type)
    {
        Id = Guid.NewGuid();

        Name = name;
        Description = description;
        Price = price;
        Type = type;

        CreatedAt = DateTime.UtcNow;
        LastUpdatedAt = null;
    }

    public string Name { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }
    public ServiceTypeEnum Type { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? LastUpdatedAt { get; private set; }
}

