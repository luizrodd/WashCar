using Microsoft.EntityFrameworkCore;
using WashCar.Domain.Data.Account;
using WashCar.Domain.Data.Client;
using WashCar.Domain.Data.Schedule;
using WashCar.Domain.Data.Service;

namespace WashCar.Infrastructure;

public class ApplicationDataContext : DbContext
{
    public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options) {}

    public DbSet<Client> Clients { get; set; } 
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<Schedule> Schedules { get; set; }
    public DbSet<ScheduleService> ScheduleServices { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<ServiceType> ServiceTypes { get; set; }
    public DbSet<Account> Accounts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDataContext).Assembly);
    }
}
