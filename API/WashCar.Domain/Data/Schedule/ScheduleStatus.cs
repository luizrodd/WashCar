using WashCar.Domain.Data.Service;

namespace WashCar.Domain.Data.Schedule;

public class ScheduleStatus
{
    public ScheduleStatusEnum Id { get; set; }
    public string Name { get; set; }

    private ScheduleStatus() { }

    public ScheduleStatus(ScheduleStatusEnum status)
    {
        Id = status;
        Name = status.ToString();
    }
}

public enum ScheduleStatusEnum
{
    Pending,
    Completed,
    Canceled
}