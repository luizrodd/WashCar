using WashCar.Domain.Data.Schedule;
using WashCar.Infrastructure.Core;

namespace WashCar.Infrastructure.Repositories;

public class ScheduleRepository : Repository<Schedule, Guid>, IScheduleRepository
{
    public ScheduleRepository(ApplicationDataContext context) : base(context)
    {
    }
}
