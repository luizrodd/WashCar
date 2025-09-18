namespace WashCar.API.Application.Models
{
    public class ScheduleDetailsDTO
    {
        public ClientDTO Client { get; set; }
        public VehicleDTO Vehicle { get; set; }
        public List<ServiceDTO> Services { get; set; }
        public DateTime ScheduledAt { get; set; }
        public string Status { get; set; } 
    }
}
