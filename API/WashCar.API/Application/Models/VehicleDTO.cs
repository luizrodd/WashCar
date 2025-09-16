namespace WashCar.API.Application.Models
{
    public class VehicleDTO
    {
        public Guid Id { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public string Plate { get; set; }
        public string Year { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime LastVisitedAt { get; set; } 
        public int TotalVisits { get; set; }
    }
}
