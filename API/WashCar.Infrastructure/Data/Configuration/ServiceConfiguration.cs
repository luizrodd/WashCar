using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WashCar.Domain.Data.Service;

namespace WashCar.Infrastructure.Data.Configuration;

public class ServiceConfiguration : IEntityTypeConfiguration<Service>
{
    public void Configure(EntityTypeBuilder<Service> builder)
    {
        builder.HasKey(s => s.Id);

        builder.Property(s => s.Id)
            .IsRequired()
            .ValueGeneratedNever();

        builder.Property(s => s.Name)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(s => s.Description)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(s => s.Price)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(s => s.Type)
            .IsRequired();

        builder
            .Property<ServiceTypeEnum>("Type")
            .HasConversion(
              v => (int)v,
              v => (ServiceTypeEnum)v)
            .HasColumnName("Type")
            .IsRequired();

        builder.Property(s => s.CreatedAt)
            .IsRequired();

        builder.Property(s => s.LastUpdatedAt)
            .IsRequired(false);
    }
}
