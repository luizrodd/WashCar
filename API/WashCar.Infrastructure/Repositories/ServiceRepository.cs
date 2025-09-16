using WashCar.Domain.Data.Service;
using WashCar.Infrastructure.Core;

namespace WashCar.Infrastructure.Repositories;

public class ServiceRepository : Repository<Service, Guid>, IServiceRepository
{
    public ServiceRepository(ApplicationDataContext context) : base(context)
    {
    }
}
