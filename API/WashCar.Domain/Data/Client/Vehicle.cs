using School.Domain.Core;

namespace WashCar.Domain.Data.Client;

public class Vehicle : Entity<Guid>
{
    public Vehicle(string model, string color, string plate, string year) 
    {
        Id = Guid.NewGuid();

        Model = model;
        Color = color;
        Plate = plate;
        Year = year;
        CreatedAt = DateTime.UtcNow;
        LastVisitedAt = DateTime.UtcNow;

        TotalVisits = 0;
    }

    public string Model { get; private set; }
    public string Color { get; private set; }
    public string Plate { get; private set; }
    public string Year { get; private set; }

    public DateTime CreatedAt { get; private set; } 
    public DateTime LastVisitedAt { get; private set; } 

    public int TotalVisits { get; private set; }
}
