
using WashCar.Domain.Core;

namespace WashCar.Domain.Data.Schedule;

public class ScheduleService : Entity<Guid> 
{
    internal ScheduleService(Guid serviceId)
    {
        Id = Guid.NewGuid();

        ServiceId = serviceId;
        CreatedOn = DateTime.UtcNow;
    }
    public Guid ServiceId { get; private set; }
    public DateTime CreatedOn { get; private set; }
}
