using WashCar.Domain.Core;

namespace WashCar.Domain.Data.Client;

public interface IClientRepository : IRepository<Client, Guid>
{
}
