using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WashCar.Domain.Data.Client;

namespace WashCar.Infrastructure.Data.Configuration;

public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
{
    public void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.HasKey(v => v.Id);

        builder.Property(v => v.Id)
            .IsRequired()
            .ValueGeneratedNever();


        builder.Property(v => v.Model)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(v => v.Color)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(v => v.Plate)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(v => v.Year)
            .IsRequired()
            .HasMaxLength(4);


        builder.Property(v => v.CreatedAt)
            .IsRequired();

        builder.Property(v => v.LastVisitedAt)
            .IsRequired(false);

        builder.Property(x => x.TotalVisits)
            .IsRequired();
    }
}
