
using WashCar.Domain.Data.Schedule;

namespace WashCar.API.Application.Models
{
    public class AppointmentsDetailsDTO
    {
        public int TotalAppointments => Schedules?.Count ?? 0;
        public int SchedulesCompleted => Schedules?.Count(s => s.Status == ScheduleStatusEnum.Completed.ToString()) ?? 0;
        public int SchedulesCanceled => Schedules?.Count(s => s.Status == ScheduleStatusEnum.Canceled.ToString()) ?? 0;
        public int SchedulesPending => Schedules?.Count(s => s.Status == ScheduleStatusEnum.Pending.ToString()) ?? 0;
        public List<ScheduleDetailsDTO> Schedules { get; set; }
    }

}
