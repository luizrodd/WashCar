using MediatR;
using Microsoft.AspNetCore.Mvc;
using WashCar.API.Application.Commands.Queries;
using WashCar.API.Application.Models;

namespace WashCar.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ServicesController : ControllerBase
{
    private IMediator _mediator;

    public ServicesController(IMediator mediator)
    {
        _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<ServiceDTO>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        var query = new GetAllServicesQuery();
        var services = await _mediator.Send(query);
        if(services == null || !services.Any())
            return NoContent();

        return Ok(services);
    }
}
