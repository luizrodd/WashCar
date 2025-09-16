using MediatR;
using Microsoft.AspNetCore.Mvc;
using WashCar.API.Application.Commands;
using WashCar.API.Controllers.Request;

namespace WashCar.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SchedulesController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateScheduleRequest request)
        {
            var command = new CreateScheduleCommand(request.VehicleId, request.ScheduledAt, request.ServicesId);
            var result = await _mediator.Send(command);
            if (!result)
                return BadRequest();

            return Ok();
        }
    }
}
