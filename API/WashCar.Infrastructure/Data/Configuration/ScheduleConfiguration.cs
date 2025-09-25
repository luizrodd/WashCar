using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WashCar.Domain.Data.Client;
using WashCar.Domain.Data.Schedule;
using WashCar.Domain.Data.Service;

namespace WashCar.Infrastructure.Data.Configuration;

public class ScheduleConfiguration : IEntityTypeConfiguration<Schedule>
{
    public void Configure(EntityTypeBuilder<Schedule> builder)
    {
        builder.HasKey(s => s.Id);

        builder.Property(s => s.Id)
            .IsRequired()
            .ValueGeneratedNever();

        builder.Property(s => s.ScheduledAt)
            .HasColumnType("smalldatetime")
            .IsRequired();

        builder.Property(s => s.CreatedAt)
            .IsRequired();

        builder.Property(s => s.UpdatedAt)
            .IsRequired();

        builder.Property(s => s.VehicleId)
            .IsRequired();

        builder.HasOne<Vehicle>()
            .WithMany()
            .IsRequired()
            .HasForeignKey(s => s.VehicleId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_Schedule_Vehicle");

        builder.HasMany(x => x.Services)
            .WithOne()
            .HasForeignKey("ScheduleId")
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_ScheduleService_Schedule");

        builder.Property(s => s.Status)
            .IsRequired();

        builder
            .Property<ScheduleStatusEnum>("Status")
            .HasConversion(
              v => (int)v,
              v => (ScheduleStatusEnum)v)
            .HasColumnName("Status")
            .IsRequired();


    }
}
