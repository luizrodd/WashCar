using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WashCar.Domain.Data.Schedule;

namespace WashCar.Infrastructure.Data.Configuration
{
    public class ScheduleStatusConfiguration : IEntityTypeConfiguration<ScheduleStatus>
    {
        public void Configure(EntityTypeBuilder<ScheduleStatus> builder)
        {
            builder.Property(e => e.Id)
            .IsRequired()
            .ValueGeneratedNever();

            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(60);

            builder.HasData(
                new ScheduleStatus(ScheduleStatusEnum.Pending),
                new ScheduleStatus(ScheduleStatusEnum.Completed),
                new ScheduleStatus(ScheduleStatusEnum.Canceled)
                );
        }
    }
}
