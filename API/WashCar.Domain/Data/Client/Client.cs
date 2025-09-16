
using WashCar.Domain.Core;

namespace WashCar.Domain.Data.Client;

public class Client : Entity<Guid>, IAggregateRoot
{
    private readonly List<Vehicle> _vehicles = new List<Vehicle>();

    private Client() 
    {
        _vehicles = new List<Vehicle>();
    }

    public Client(string name, string email, string phoneNumber, Vehicle vehicle) : this()
    {
        Id = Guid.NewGuid();

        Name = name;
        Email = email;
        PhoneNumber = phoneNumber;
        _vehicles.Add(vehicle);

        CreatedAt = DateTime.UtcNow;
    }

    public string Name { get; private set; }
    public string Email { get; private set; }
    public string PhoneNumber { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public IReadOnlyCollection<Vehicle> Vehicles => _vehicles;
}
