using MediatR;
using WashCar.API.Application.Models;
using WashCar.Domain.Data.Service;

namespace WashCar.API.Application.Commands.Queries;

public class GetAllServicesQueryHandler : IRequestHandler<GetAllServicesQuery, IEnumerable<ServiceDTO>>
{
    private readonly IServiceRepository _serviceRepository;
    public GetAllServicesQueryHandler(IServiceRepository serviceRepository)
    {
        _serviceRepository = serviceRepository;
    }
    public async Task<IEnumerable<ServiceDTO>> Handle(GetAllServicesQuery request, CancellationToken cancellationToken)
    {
        var services = _serviceRepository.GetAll();

        return services.Select(s => new ServiceDTO
        {
            Id = s.Id,
            Name = s.Name,
            Description = s.Description,
            Price = s.Price,
            Type = s.Type,
            CreatedAt = s.CreatedAt,
            LastUpdatedAt = s.LastUpdatedAt,
        });
    }
}

public class GetAllServicesQuery : IRequest<IEnumerable<ServiceDTO>>
{
}
