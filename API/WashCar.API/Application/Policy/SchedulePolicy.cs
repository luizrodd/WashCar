using WashCar.Domain.Data.Schedule;

namespace WashCar.API.Application.Policy;

public class SchedulePolicy : ISchedulePolicy
{
    public SchedulePolicyEnum ValidateIfCanCreate()
    {
        return SchedulePolicyEnum.OK;
    }
}
