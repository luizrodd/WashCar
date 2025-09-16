using Microsoft.EntityFrameworkCore;
using WashCar.Domain.Data.Client;
using WashCar.Infrastructure.Core;

namespace WashCar.Infrastructure.Repositories
{
    public class ClientRepository : Repository<Client, Guid>, IClientRepository
    {
        public ClientRepository(ApplicationDataContext context) : base(context)
        {
           
        }

        public override Client Get(Guid id)
        {
            return _entity.Include(x => x.Vehicles).FirstOrDefault(x => x.Id == id);
        }
    }
}
