using WashCar.Domain.Data.Client;
using WashCar.Infrastructure.Core;

namespace WashCar.Infrastructure.Repositories
{
    public class ClientRepository : Repository<Client, Guid>, IClientRepository
    {
        public ClientRepository(ApplicationDataContext context) : base(context)
        {
        }
    }
}
