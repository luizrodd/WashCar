using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WashCar.Domain.Data.Account;

namespace WashCar.Infrastructure.Data.Configuration;

public class AccountConfiguration : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder.HasKey(builder => builder.Id);

        builder.Property(builder => builder.Name)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(builder => builder.Email)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(builder => builder.Password)
            .IsRequired()
            .HasMaxLength(255);
    }
}
