using MediatR;
using Microsoft.AspNetCore.Mvc;
using WashCar.API.Application.Commands;
using WashCar.API.Application.Commands.Queries;
using WashCar.API.Application.Models;
using WashCar.API.Controllers.Request;

namespace WashCar.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ClientsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ClientsController(IMediator mediator)
    {
        _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateClientRequest request)
    {
        var command = new CreateClientCommand(request.Name, request.Email, request.PhoneNumber, 
            request.Vehicle.Model, request.Vehicle.Color, request.Vehicle.Plate, request.Vehicle.Year, request.Vehicle.ScheduledDate);
        var clientId = await _mediator.Send(command);
        if(clientId == Guid.Empty)
            return BadRequest();

        return Ok(clientId);
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ClientDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> GetAll()
    {
        var query = new GetAllClientsQuery();
        var clients = await _mediator.Send(query);
        if (clients == null || !clients.Any())
            return NoContent();

        return Ok(clients);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ClientDetailsDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var query = new GetClientByIdQuery(id);
        var client = await _mediator.Send(query);

        if (client == null)
            return NoContent();

        return Ok(client);
    }
}
