using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WashCar.Domain.Data.Client;

namespace WashCar.Infrastructure.Data.Configuration;

public class ClientConfiguration : IEntityTypeConfiguration<Client>
{
    public void Configure(EntityTypeBuilder<Client> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Id)
            .IsRequired()
            .ValueGeneratedNever();

        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(c => c.Email)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(c => c.PhoneNumber)
            .IsRequired()
            .HasMaxLength(35);

        builder.Property(c => c.CreatedAt)
            .IsRequired();

        builder.HasMany(c => c.Vehicles)
            .WithOne()
            .HasForeignKey("ClientId")
            .HasConstraintName("FK_Client_Vehicle")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
