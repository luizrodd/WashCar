using MediatR;
using WashCar.API.Application.Models;
using WashCar.Domain.Data.Client;

namespace WashCar.API.Application.Commands.Queries;

public class GetClientByIdQueryHandler(IClientRepository repository) : IRequestHandler<GetClientByIdQuery, ClientDetailsDTO?>
{
    private readonly IClientRepository _clientRepository = repository ?? throw new ArgumentNullException(nameof(repository));
    public async Task<ClientDetailsDTO?> Handle(GetClientByIdQuery request, CancellationToken cancellationToken)
    {
        var client = _clientRepository.Get(request.Id);
        if (client is null) return null;

        return new ClientDetailsDTO
        {
            Id = client.Id,
            Name = client.Name,
            Email = client.Email,
            PhoneNumber = client.PhoneNumber,
            Vehicles = client.Vehicles.Select(v => new VehicleDTO
            {
                Id = v.Id,
                Model = v.Model,
                Year = v.Year,
                Color = v.Color,
                CreatedAt = v.CreatedAt,
                LastVisitedAt = v.LastVisitedAt,
                Plate = v.Plate,
                TotalVisits = v.TotalVisits
            }).ToList()
        };
    }
}

public record GetClientByIdQuery(Guid Id) : IRequest<ClientDetailsDTO?>;