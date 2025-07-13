using School.Domain.Core;

namespace WashCar.Domain.Data.User;

public class Account : Entity<Guid>, IAggregateRoot
{
    public Account(string name, string email, string password)
    {
        Id = Guid.NewGuid();

        Name = name;
        Email = email;
        Password = password;
    }

    public string Name { get; private set; }
    public string Email { get; private set; }
    public string Password { get; private set; }
}
