using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WashCar.Domain.Data.Service;

namespace WashCar.Infrastructure.Data.Configuration;

public class ServiceTypeConfiguration : IEntityTypeConfiguration<ServiceType>
{
    public void Configure(EntityTypeBuilder<ServiceType> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired()
            .ValueGeneratedNever();

        builder.Property(e => e.Name)
            .IsRequired()
            .HasMaxLength(60);

        builder.HasData(
           new ServiceType(ServiceTypeEnum.Premium),
           new ServiceType(ServiceTypeEnum.Basic),
           new ServiceType(ServiceTypeEnum.Detailing)
           );
    }
}
