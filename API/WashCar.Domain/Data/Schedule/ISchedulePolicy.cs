namespace WashCar.Domain.Data.Schedule;

public interface ISchedulePolicy
{
    SchedulePolicyEnum ValidateIfCanCreate();
}

public enum SchedulePolicyEnum
{
    NO_OVERLAP,
    OK
}