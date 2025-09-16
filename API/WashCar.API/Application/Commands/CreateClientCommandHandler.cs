using MediatR;
using WashCar.Domain.Data.Client;

namespace WashCar.API.Application.Commands;

public class CreateClientCommandHandler(IClientRepository clientRepository) : IRequestHandler<CreateClientCommand, Guid>
{
    private readonly IClientRepository _clientRepository = clientRepository ?? throw new ArgumentNullException(nameof(clientRepository));
    public async Task<Guid> Handle(CreateClientCommand request, CancellationToken cancellationToken)
    {
        var client = new Client(request.Name, request.Email, request.PhoneNumber, new Vehicle(request.Model, request.Color,
            request.Plate, request.Year, request.LastTimeVisitedAt));

        _clientRepository.Add(client);
        _clientRepository.SaveChanges();

        return client.Id;
    }
}

public record CreateClientCommand(string Name, string Email, string PhoneNumber, 
    string Model, string Color, string Plate, string Year, DateTime LastTimeVisitedAt) : IRequest<Guid>;