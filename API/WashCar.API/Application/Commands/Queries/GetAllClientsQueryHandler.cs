using MediatR;
using WashCar.API.Application.Models;
using WashCar.Domain.Data.Client;

namespace WashCar.API.Application.Commands.Queries;

public class GetAllClientsQueryHandler(IClientRepository clientRepository) : IRequestHandler<GetAllClientsQuery, List<ClientDTO>>
{
    private readonly IClientRepository _clientRepository = clientRepository ?? throw new ArgumentNullException(nameof(clientRepository));
    public async Task<List<ClientDTO>> Handle(GetAllClientsQuery request, CancellationToken cancellationToken)
    {
        var clients = _clientRepository.GetAll();
        if(clients == null || !clients.Any())
            return new List<ClientDTO>();

        var clientDTOs = clients.Select(c => new ClientDTO
        {
            Id = c.Id,
            Name = c.Name,
            Email = c.Email,
            PhoneNumber = c.PhoneNumber
        });

        return clientDTOs.ToList();
    }
}

public record GetAllClientsQuery : IRequest<List<ClientDTO>>
{

}

