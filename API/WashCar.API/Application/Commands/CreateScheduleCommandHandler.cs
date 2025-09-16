using MediatR;
using WashCar.Domain.Data.Schedule;

namespace WashCar.API.Application.Commands;

public class CreateScheduleCommandHandler(IScheduleRepository scheduleRepository, ISchedulePolicy policy) : IRequestHandler<CreateScheduleCommand, bool>
{
    private readonly IScheduleRepository _scheduleRepository = scheduleRepository ?? throw new ArgumentNullException(nameof(scheduleRepository));
    private readonly ISchedulePolicy _policy = policy ?? throw new ArgumentNullException(nameof(policy));

    public async Task<bool> Handle(CreateScheduleCommand request, CancellationToken cancellationToken)
    {
        var schedule = new Schedule(request.VehicleId, request.ScheduledAt, request.ServicesId, _policy);

        _scheduleRepository.Add(schedule);
        _scheduleRepository.SaveChanges();

        return true; 
    }
}

public record CreateScheduleCommand(Guid VehicleId, DateTime ScheduledAt, Guid[] ServicesId) : IRequest<bool>;
