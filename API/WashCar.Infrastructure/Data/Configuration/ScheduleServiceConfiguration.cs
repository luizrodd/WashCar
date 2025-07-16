using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WashCar.Domain.Data.Schedule;
using WashCar.Domain.Data.Service;

namespace WashCar.Infrastructure.Data.Configuration;

public class ScheduleServiceConfiguration : IEntityTypeConfiguration<ScheduleService>
{
    public void Configure(EntityTypeBuilder<ScheduleService> builder)
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .IsRequired()
            .ValueGeneratedNever();

        builder.HasOne<Service>()
            .WithMany()
            .IsRequired()
            .HasForeignKey(s => s.ServiceId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .IsRequired();

        builder.Property(x => x.ServiceId)
            .IsRequired();

        builder.Property(x => x.CreatedOn)
            .IsRequired();
    }
}
