using School.Domain.Core;

namespace WashCar.Domain.Data.Schedule;

public class Schedule : Entity<Guid>, IAggregateRoot
{
    public Schedule(Guid vehicleId, Guid[] servicesId, DateTime scheduledAt)
    {
        Id = Guid.NewGuid();

        VehicleId = vehicleId;
        ServicesId = servicesId;

        ScheduledAt = scheduledAt;
        CreatedAt = DateTime.UtcNow;
    }

    public DateTime ScheduledAt { get; private set; }

    public Guid VehicleId { get; private set; }
    public Guid[] ServicesId { get; private set; }

    public DateTime CreatedAt { get; private set; }
}
