using Microsoft.AspNetCore.Mvc;
using WashCar.API.Application.Models;
using WashCar.API.Application.Queries;

namespace WashCar.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvaibleTimesController : ControllerBase
    {
        private IAvaibleTimeQueries _avaibleTimeQueries;

        public AvaibleTimesController(IAvaibleTimeQueries avaibleTimeQueries)
        {
            _avaibleTimeQueries = avaibleTimeQueries ?? throw new ArgumentNullException(nameof(avaibleTimeQueries));
        }

        [HttpGet("{date}")]
        [ProducesResponseType(typeof(List<TimeSpan>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(DateTime date)
        {
            var result = await _avaibleTimeQueries.GetAvaibleTimes(date);
            return Ok(result);
        }
    }
}
