using MediatR;
using Microsoft.AspNetCore.Mvc;
using WashCar.API.Application.Commands;
using WashCar.API.Application.Models;
using WashCar.API.Application.Queries;
using WashCar.API.Controllers.Request;

namespace WashCar.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ISchedulesQueries _schedulesQueries;

        public SchedulesController(IMediator mediator, ISchedulesQueries schedulesQueries)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _schedulesQueries = schedulesQueries ?? throw new ArgumentNullException(nameof(schedulesQueries));
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

        [HttpGet("{date}")]
        [ProducesResponseType(typeof(List<AppointmentsDetailsDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Get(DateTime date)
        {
            var result = await _schedulesQueries.Get(date);
            if (result == null)
                return NoContent();

            return Ok(result);
        }
    }
}
