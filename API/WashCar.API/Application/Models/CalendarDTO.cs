namespace WashCar.API.Application.Models;

public class CalendarDTO
{
    public DateOnly Day { get; set; }
    public List<ScheduleDetailsDTO> Appointments { get; set; } = new List<ScheduleDetailsDTO>();
}
