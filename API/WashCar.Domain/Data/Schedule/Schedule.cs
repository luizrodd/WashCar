
using WashCar.Domain.Core;

namespace WashCar.Domain.Data.Schedule;

public class Schedule : Entity<Guid>, IAggregateRoot
{
    private readonly List<ScheduleService> _services;

    private Schedule()
    {
        _services = new List<ScheduleService>();
    }

    public Schedule(Guid vehicleId, DateTime scheduledAt, Guid[] servicesId, ISchedulePolicy policy) : this()
    {
        Id = Guid.NewGuid();

        VehicleId = vehicleId;
        ScheduledAt = scheduledAt;
        CreatedAt = DateTime.UtcNow;

        _services.AddRange(servicesId.Select(serviceId => new ScheduleService(serviceId)));

        var validation = policy.ValidateIfCanCreate();
        if (validation != SchedulePolicyEnum.OK)
            throw new CustomException("Schedule cannot be created due to policy violation. ${validation}");
    }


    public DateTime ScheduledAt { get; private set; }

    public Guid VehicleId { get; private set; }
    public IReadOnlyCollection<ScheduleService> Services => _services;
    public DateTime CreatedAt { get; private set; }
}
